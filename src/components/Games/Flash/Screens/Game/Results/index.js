import React, { Component } from 'react';

import './FlashScreenResults.css';
import {v4} from 'uuid';

class FlashScreenResults extends Component {
    /*
    * this.props.results => wholePool
    * */

    render () {
        return (
            <div className="soroban-results-block">
                <div className="soroban-results">
                    {this.getTaskResults()}
                </div>

                <div className="soroban-results-tomain">
                    <span
                        className="clickable"
                        onClick={this.goToMain}
                    >Выйти на главную</span>
                </div>
            </div>
        )
    }

    getTaskResults = () => {
        const {results} = this.props;

        return Object.keys(results).map(key => {
            let taskNumber = parseInt(key, 10)+1;
            return (
                <div className="soroban-results-t" key={v4()}>
                    <div className="soroban-results-t-title">Задание №{taskNumber}</div>
                    {this.getImpulseResults(results[key])}
                </div>
            );
        })
    };

    getImpulseResults = (impulseData) => {
        return Object.keys(impulseData).map(key => {
            let impulseNumber = parseInt(key, 10)+1;
            let answer = impulseData[key].guessed === 1 ? 'Верно' : impulseData[key].guessed === -1 ? 'Неверно' : '';
            let style = impulseData[key].guessed === 1 ? 'sr-green' : impulseData[key].guessed === -1 ? 'sr-red' : '';

            return (
                <div className="soroban-results-i" key={v4()}>
                    <div className="soroban-results-i-imp">Показ №{impulseNumber}</div>
                    <div className="soroban-results-i-nmb">Число: <span>{impulseData[key].value}</span></div>
                    <div className={`soroban-results-i-anw ${style}`}>{answer}</div>
                </div>
            )
        })
    };

    goToMain = () => {
        this.props.toMain(0);
    }
}

export default FlashScreenResults;