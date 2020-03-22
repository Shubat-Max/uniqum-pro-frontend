import React, { Component } from 'react';
import {connect} from "react-redux";
import Cookies from 'universal-cookie';
import './Columns.css';

import MainScreen from './Screens/MenuPasser';
import GameScreen from './Screens/Game';
import ExitScreen from './Screens/Exit';
import SettingsScreen from './Screens/Settings';

import {Redirect} from "react-router-dom";
import {loadUser, systemStartup} from "../../../actions";

class Columns extends Component {
    state = {
        gameScreenState: 0,
        settings: {}
    };

    render(){
        if(this.identification()){
            return this.getGameLayout();
        }else{
            return <Redirect push to="/login"/>
        }
    };

    identification = () => {
        const cookies = new Cookies();
        const UID = cookies.get('UID');
        const URID = cookies.get('URID');
        if(UID === undefined || URID === undefined){
            return 0;
        }else{
            const {system, systemStartup, loadUser} = this.props;
            if(!system){
                systemStartup(UID, URID);
                loadUser(UID);
            }
            return 1;
        }
    };

    getGameLayout = () => {
        return (
            <div className="columns-wrapper">

                {/*<AudioPlayer />*/}

                <div className="columns-navbar">
                    <span className="flash-title">СТОЛБЦЫ</span>
                </div>
                <div className="columns-body">
                    <div className="columns-segments">
                        <div className="block-col-side" />
                        <div className="block-col-main">
                            <div className="columns-game-wrapper">

                                {this.getScreen()}

                            </div>
                        </div>
                        <div className="block-col-side" />
                    </div>
                </div>
            </div>
        )
    };

    getScreen = () => {
        if(!this.props.system){
            return 'LOADING...';
        }else{
            switch(this.state.gameScreenState){
                case 0:
                    return <MainScreen handler={this.handleScreenChange.bind(this)}
                                       settingsHandler={this.handleSettingsChange.bind(this)}
                                       settings={this.state.settings}
                                       userId={this.props.system._id}
                    />;

                case 1:
                    return <GameScreen handler={this.handleScreenChange.bind(this)}
                                       userId={this.props.system._id}
                                       settings={this.state.settings}
                    />;

                case 2:
                    return <SettingsScreen settings={this.state.settings}
                                           settingsHandler={this.handleSettingsChange.bind(this)}
                                           handler={this.handleScreenChange.bind(this)}
                    />;

                case 99:
                    return <ExitScreen
                        handler={this.handleScreenChange.bind(this)}
                    />;

                default:
                    return <MainScreen />;
            }
        }
    };


    handleScreenChange = (index) => {
        this.setState({
            gameScreenState: index
        })
    };

    handleSettingsChange = (settings) => {
        this.setState({
            settings
        })
    }
}

export default connect(store => {
    return {
        system: store.system.entities.get(0)
    }
},{
    systemStartup,
    loadUser
})(Columns);