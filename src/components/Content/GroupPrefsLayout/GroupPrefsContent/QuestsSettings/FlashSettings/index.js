import React, { Component } from 'react';

import './FlashSettings.css';
import {connect} from "react-redux";

class FlashSettings extends Component {
    render(){
        return this.getSettings()
    }

    getSettings = () => {
        return (
            <div className="quest-settings-panel">
                <div className="quest-settings-head">
                    <span className="quest-settings-title">Флеш</span>
                    <span className="quest-settings-edit">Редактировать</span>
                </div>
                <div className="quest-settings-body">
                    <div className="quest-settings-option">
                        <span className="quest-settings-option-title">Цифры:</span>
                        <span className="quest-settings-option-selected">
                            {this.getOptionNumbers()}
                        </span>
                    </div>
                    <div className="quest-settings-option">
                        <span className="quest-settings-option-title">Размер числа:</span>
                        <span className="quest-settings-option-selected">
                            {this.getOptionNumberSize()}
                        </span>
                    </div>
                    <div className="quest-settings-option">
                        <span className="quest-settings-option-title">Прогресс размера числа:</span>
                        <span className="quest-settings-option-selected">
                            {this.getOptionNumberSizeProgress()}
                        </span>
                    </div>
                    <div className="quest-settings-option">
                        <span className="quest-settings-option-title">Импульсы:</span>
                        <span className="quest-settings-option-selected">
                            {this.getOptionImpulse()}
                        </span>
                    </div>
                    <div className="quest-settings-option">
                        <span className="quest-settings-option-title">Прогресс импульсов:</span>
                        <span className="quest-settings-option-selected">
                            {this.getOptionImpulseProgress()}
                        </span>
                    </div>
                    <div className="quest-settings-option">
                        <span className="quest-settings-option-title">Скорость:</span>
                        <span className="quest-settings-option-selected">
                            {this.getOptionSpeed()}
                        </span>
                    </div>
                    <div className="quest-settings-option">
                        <span className="quest-settings-option-title">Прогресс скорости:</span>
                        <span className="quest-settings-option-selected">
                            {this.getOptionSpeedProgress()}
                        </span>
                    </div>
                    <div className="quest-settings-option">
                        <span className="quest-settings-option-title">Заданий:</span>
                        <span className="quest-settings-option-selected">
                            {this.getOptionRepeat()}
                        </span>
                    </div>
                </div>
            </div>
        )
    };

    getOptionNumbers = () => {
        const {flashSettings} = this.props;

        // eslint-disable-next-line
        return Object.keys(flashSettings.n).map(function(key) {
            if(flashSettings.n[key]){
                return (
                    <span key={key}>{key}</span>
                )
            }
        });
    };

    getOptionNumberSize = () => {
        return this.props.flashSettings.ns ? this.props.flashSettings.ns : 'NaN';
    };

    getOptionNumberSizeProgress = () => {
        return this.props.flashSettings.pns ? 'Да' : 'Нет';
    };

    getOptionImpulse = () => {
        return this.props.flashSettings.i ? this.props.flashSettings.i : 'NaN';
    };

    getOptionImpulseProgress = () => {
        return this.props.flashSettings.pi ? 'Да' : 'Нет';
    };

    getOptionSpeed = () => {
        return this.props.flashSettings.s ? this.props.flashSettings.s + ' сек.' : 'NaN';
    };

    getOptionSpeedProgress = () => {
        return this.props.flashSettings.ps ? 'Да' : 'Нет';
    };

    getOptionRepeat = () => {
        return this.props.flashSettings.t ? this.props.flashSettings.t : 'NaN';
    };
}

export default connect((store, ownProps) => {
    return {
        flashSettings: store.groups.entities.get(ownProps.groupId).gameSettings.flash
    }
})(FlashSettings);