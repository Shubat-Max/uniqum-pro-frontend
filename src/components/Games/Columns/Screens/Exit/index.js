import React, {Component} from 'react';

import './ColumnsScreenExit.css';
import {Redirect} from "react-router-dom";

class ColumnsScreenExit extends Component {
    state = {
        pushRedirectTo: ''
    };

    render(){
        return this.getScreen();
    }

    getScreen = () => {
        return (
            <div className="columns-game">

                {this.pushRedirect()}

                <div className="choice-wrapper">
                    <div className="choice-question">Вы уверены?</div>
                    <div className="choices">
                        <span
                            className="choice-yes"
                            onClick={() => this.handleRedirectButtons('/')}
                        >Да</span>
                        <span
                            className="choice-no"
                            onClick={() => this.handleScreenChange(0)}
                        >Нет</span>
                    </div>
                </div>
            </div>
        )
    };

    handleRedirectButtons = (target) => {
        this.setState({
            pushRedirectTo: target
        })
    };

    handleScreenChange = (index) => {
        this.props.handler(index);
    };

    pushRedirect = () => {
        if (this.state.pushRedirectTo !== '') return <Redirect push to={this.state.pushRedirectTo}/>
    }
}

export default ColumnsScreenExit;