import React, { Component } from 'react';
import {connect} from "react-redux";
import Cookies from 'universal-cookie';
import './Flash.css';

import MainScreen from './Screens/MainPasser';
import GameScreen from './Screens/Game';
import ExitScreen from './Screens/Exit';
import SettingsScreen from './Screens/Settings';

import {Redirect} from "react-router-dom";
import {loadUser, systemStartup} from "../../../actions";


class Flash extends Component {


    state = {
        gameScreenState: 0,
        settings: {
            n: {
                1: true,
                2: true,
                3: true,
                4: true,
                5: true,
                6: true,
                7: true,
                8: true,
                9: true,
                0: true
            },
            ns: 1,
            pns: false,
            i: 1,
            pi: false,
            s: 1,
            ps: false,
            t: 0
        }
    };

    render(){
        return this.initialize();
    }

    getGameLayout = () => {
        return (
            <div className="flash-wrapper">

                {/*<AudioPlayer />*/}

                <div className="flash-navbar">
                    <span className="flash-title">ФЛЕШ</span>
                </div>
                <div className="flash-body">
                    <div className="flash-segments">
                        <div className="block-col-side" />
                        <div className="block-col-main">
                            <div className="flash-game-wrapper">

                                {this.getScreen()}

                            </div>
                        </div>
                        <div className="block-col-side" />
                    </div>
                </div>
            </div>
        )
    };


    handleScreenChange = (index) => {
        this.setState({
            gameScreenState: index
        })
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

    initialize = () => {
        const cookies = new Cookies();
        const UID = cookies.get('UID');
        const URID = cookies.get('URID');
        if(UID === undefined || URID === undefined){
            return (
                <Redirect push to="/login"/>
            );
        }else{
            const {system} = this.props;
            if(!system){
                this.props.systemStartup(UID, URID);
                this.props.loadUser(UID);
            }
            return this.getGameLayout();
        }
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
})(Flash);