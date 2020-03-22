import React, { Component } from 'react';

import './ColumnsScreenMenu.css'
import {connect} from "react-redux";
import {getDetails} from "../../../../../actions";

class FlashScreenMenu extends Component {
    render(){
        return this.getScreen();
    }

    getScreen = () => {
        if(this.props.user.memberOf){
            if(!this.props.group){
                this.props.getDetails(this.props.user.memberOf);
                return (
                    <div className="columns-game">
                        Loader...
                    </div>
                )
            }
        }

        return (
            <div className="columns-game">

                <div className="menu-wrapper">
                    <div className="menu">

                        {this.getPlayButton()}

                        {this.getGroupSettingsButton()}

                        {this.getCustomSettingsButton()}

                        {/*{this.getInfoButton()}*/}

                        {this.getExitButton()}

                    </div>
                </div>

            </div>
        )
    };


    handleScreenChange = (index) => {
        this.props.handler(index);
    };


    getPlayButton = () => {
        let showcase = (
            <div className="menu-item">
                <span
                    onClick={() => this.handleScreenChange(1)}
                >Играть</span>
            </div>
        );

        return showcase;
    };


    getGroupSettingsButton = () => {
        let showcase = (
            <div className="menu-item">
                <span
                    onClick={this.loadDefaultSettings}
                >Загрузить настройки группы</span>
            </div>
        );

        if(this.props.user.role === 3 && this.props.user.memberOf !== null){
            return showcase;
        }else{
            return null;
        }
    };


    getCustomSettingsButton = () => {
        let showcase = (
            <div className="menu-item">
                <span
                    onClick={() => this.handleScreenChange(2)}
                >Свои настройки</span>
            </div>
        );

        return showcase;
    };

    getInfoButton = () => {
        let showcase = (
            <div className="menu-item">
                <span
                    onClick={this.showSettings}
                >Инфо</span>
            </div>
        );

        return showcase;
    };

    getExitButton = () => {
        let showcase = (
            <div className="menu-item">
                <span
                    onClick={() => this.handleScreenChange(99)}
                >Выход</span>
            </div>
        );

        return showcase;
    };

    loadDefaultSettings = () => {
        this.props.settingsHandler(this.props.group.gameSettings.flash);
        alert('Настройки группы загружены');
    };

    showSettings = () => {
        console.log(this.props);
        console.log(this.props.settings);
    };
}

export default connect((store, ownProps) => {
    return {
        group: store.groups.entities.get(ownProps.user.memberOf)
    }
},{
    getDetails
})(FlashScreenMenu);