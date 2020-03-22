import React, { Component } from 'react';

import './HelpContent.css';
import '../../common.css';



class HelpContent extends Component {
    state = {
        q1: false
    };


    render(){
        return (
            <div className="main-block">
                <div className="help-page___head">
                    Часто задаваемые вопросы
                </div>
                <div className="help-page___body">
                    <div className="help-page___quest-block">
                        <div className="help-page___quest-head">
                            Question 1
                        </div>
                        <div className="help-page___quest-body">
                            Answer
                        </div>
                    </div>
                    <div className="help-page___quest-block">
                        <div className="help-page___quest-head-active">
                            Question 2
                        </div>
                        <div className="help-page___quest-body">
                            Answer
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleClickSettingsBlock = type => () => {
        const trigger = `${type}Open`;

        this.setState({
            [trigger]: !this.state[trigger]
        })
    };
}

export default HelpContent;