import React, { Component } from 'react';
import {connect} from "react-redux";
import {v4} from 'uuid';


import Soroban from './Soroban';
import ImpulseFinal from './ImpulseFinal';
import Results from './Results';
import KeyboardCatcher from '../Game/KeyboardCatcher';
import AnswerInput from '../Game/AnswerInput';

import './FlashScreenGame.css'
import {sleep} from "../../../../../helpers";


const _DEV = false;

class FlashScreenGame extends Component {
    state = {
        answerInput: '',
        currentImpulse: 0,
        guessedNumbers: null,
        wholePool: null,
        tries: 0,
        taskTries: 0,
        allowInput: false,
        timeoutId: '',
        showResults: false
    };

    componentDidMount(){
        this.setState(this.props.settings);
    }

    render(){
        return this.getScreen();
    }

    initFlash = () => {

        const {i, n, ns, wholePool, taskTries} = this.state;

        let localWholePool = Object.assign({}, wholePool);
        let generatedNumbers = this.generateNumbers(n, ns, i);
        localWholePool[taskTries] = generatedNumbers;

        if(this.state.guessedNumbers === null){
            this.setState({
                guessedNumbers: generatedNumbers,
                wholePool: localWholePool
            });
            return null
        }

        // console.log('--- Guessed Numbers', this.state.guessedNumbers);

        return this.startFlash(this.state.guessedNumbers);
    };

    startFlash = (generatedNumbers) => {

        const {currentImpulse, i} = this.state;

        if(currentImpulse < Object.keys(generatedNumbers).length && currentImpulse >= 0){
            if(_DEV)console.log('Impulse number: ', currentImpulse+1);
            let nextImpulse = (this.state.currentImpulse+1)*-1;

            // Keep timeout id in state to terminate later ???
            setTimeout(() => {
                this.setState({
                    currentImpulse: nextImpulse,
                    allowInput: i === (currentImpulse+1)
                })
            }, (this.state.s * 1000));

            if(currentImpulse >= 0){
                if(_DEV) console.log('Displaying number: ', generatedNumbers[currentImpulse].value);
                return this.generateSorobanQuery(generatedNumbers[currentImpulse].value);
            }else{
                return null
            }

        }else if(currentImpulse < 0){
            /*
            *   Allows to make a break between impulses, by default: 0.5s
            */
            let nextImpulse = this.state.currentImpulse*-1;
            
            sleep(500);

            this.setState({
                currentImpulse: nextImpulse
            });

            // setTimeout(() => {
            //     this.setState({
            //         currentImpulse: nextImpulse
            //     })
            // }, (500));
            return null;
        }else{
            return null;
        }

    };





/**********************************************************************************************************************/
/*********                                                                                                      *******/
/*********                              SIDE FUNCTIONS MODULES BELOW                                            *******/
/*********                                                                                                      *******/
/**********************************************************************************************************************/

    generateNumbers = (numberPack, numberSize, amount) => {
        function getRandomInt(min, max) {
            if(max === 0) return 0;
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        Object.filter = (obj, predicate) =>
            Object.keys(obj)
                .filter( key => predicate(obj[key]) )
                // eslint-disable-next-line
                .reduce( (res, key) => (res[key] = obj[key], res), {} );
        let allowedNumbers = Object.keys(Object.filter(numberPack, numberActive => numberActive === true));

        let generatedNumbers = {};
        for(let impulses = 0; impulses < amount; impulses++){

            let generatedNumber = '';

            for(let i = 0; i < numberSize; i++) {
                let generatedIndex = getRandomInt(0, allowedNumbers.length-1);
                // if(_DEV)console.log('generatedIndex', generatedIndex);
                // if(_DEV)console.log('generatedDigit', allowedNumbers[generatedIndex]);

                // DO NOT ALLOW TO GENERATE 0 (ZEROs) AT THE BEGINNING

                if(!(allowedNumbers[generatedIndex] === '0' && this.state.ns === 1)){
                    if(generatedNumber === '' && allowedNumbers[generatedIndex] === '0'){
                        if(_DEV)console.log('Continue to generate again loop');
                        i -= 1; continue;
                    }
                }


                generatedNumber = `${generatedNumber}`.concat(allowedNumbers[generatedIndex]);
                // if(_DEV)console.log('### Number in total', generatedNumber);
            }

            generatedNumbers[impulses] = {
                value: generatedNumber,
                guessed: 0
            };
        }

        return generatedNumbers;
    };





/**********************************************************************************************************************/
/*********                                                                                                      *******/
/*********                                 HANDLE MODULES BELOW                                                 *******/
/*********                                                                                                      *******/
/**********************************************************************************************************************/

    handleScreenChange = (index) => {
        this.props.handler(index);
    };


    // handleInputOnKeyUp = (evt) => {
    //     if(evt.key === 'Enter'){
    //         this.handleSubmitAnswerButton();
    //     }
    // };

    handleInputChange = (evt) => {
        this.setState({
            answerInput: evt.target.validity.valid ? evt.target.value : this.state.answerInput
        })
    };


    handleSubmitAnswerButton = (answerInput) => {
        const { guessedNumbers, tries } = this.state;

        if(answerInput === ''){ return null }
        let localGuessedNumbers = guessedNumbers;

        if(tries+1 <= Object.keys(localGuessedNumbers).length){

            if(answerInput === localGuessedNumbers[tries].value){
                localGuessedNumbers[tries].guessed = 1;
            }else{
                localGuessedNumbers[tries].guessed = -1;
            }


            this.setState({
                tries: this.state.n === 0 ? tries : tries+1,
                guessedNumbers: localGuessedNumbers
            });

            if(tries+1 === Object.keys(localGuessedNumbers).length){
                this.setState({
                    taskTries: this.state.taskTries+1,
                    allowInput: false
                });
            }
        }
    };


    handleNextWave = () => {
        function progressNumberSize(numberSize){
            if(numberSize < 10){
                return numberSize+1;
            }else return numberSize;
        }

        function progressImpulses(impulses){
            if(impulses < 10){
                return impulses + 1;
            }else return impulses;
        }

        function progressSpeed(speed){
            const speedOptions = [10, 7, 5, 4, 3.5, 3, 2.5, 2, 1.8, 1.5, 1.2, 1, 0.7, 0.5, 0.4, 0.3, 0.2, 0.1];
            let currentOptionIndex = speedOptions.indexOf(speed);

            if(currentOptionIndex !== speedOptions.length-1){
                return speedOptions[currentOptionIndex+1]
            }else{
                return speed;
            }
        }


        const {i, pi, s, ps, n, ns, pns, guessedNumbers, wholePool, taskTries} = this.state;
        let doProgress = true;
        let localWholePool = Object.assign({}, wholePool);

        Object.keys(guessedNumbers).forEach(key => {
            if(doProgress){
                if(guessedNumbers[key].guessed === -1){
                    doProgress = false;
                }
            }
        });

        let newNumberSize = pns ? doProgress ? progressNumberSize(ns) : ns : ns;
        let newImpulses = pi ? doProgress ? progressImpulses(i) : i : i;
        let newSpeed =  ps ? doProgress ? progressSpeed(s) : s : s;
        let generatedNumbers = this.generateNumbers(n, newNumberSize, newImpulses);
        localWholePool[taskTries] = generatedNumbers;


        this.setState({
            answerInput: '',
            currentImpulse: 0,
            tries: 0,
            guessedNumbers: generatedNumbers,
            ns: newNumberSize,
            i: newImpulses,
            s: newSpeed,
            wholePool: localWholePool
        })
    };

    handleShowResults = () => {
        this.setState({
            showResults: true
        })
    };




/**********************************************************************************************************************/
/*********                                                                                                      *******/
/*********                                   GET MODULES BELOW                                                  *******/
/*********                                                                                                      *******/
/**********************************************************************************************************************/

    getScreen = () => {
        if(!this.state.n) return  <div className="soroban-container">ЗАГРУЗКА...</div>;

        return (
            <div className="flash-game">
                <div className="flash-menu-top">
                    <span className="flash-menu-item">
                        <span>{this.props.user?this.props.user.name:'загрузка...'}</span>
                    </span>
                    <span className="flash-menu-item">00000000</span>
                    <span className="flash-menu-item">
                        <span
                            className="clickable"
                            onClick={() => this.handleScreenChange(0)}
                        >Главная</span>
                    </span>
                </div>

                <div className="flash-board-wrapper">
                    <div className="flash-board">

                        <div className="soroban-query">
                            {this.initFlash()}
                        </div>
                        { console.log('TRIPPLED') }
                        { this.getSorobanInput() }

                        { this.getSorobanAnswerStatus() }

                        {/*{ this.getSorobanInfo() }*/}

                    </div>
                </div>

                <div className="flash-menu-bottom">

                    { this.getSorobanTasks() }

                    <span className="flash-menu-item" />
                </div>
            </div>
        )
    };

    getSorobanAnswerStatus = () => {
        if(this.state.guessedNumbers){
            const { guessedNumbers } = this.state;

            let localGuessedNumbers = Object.assign({}, guessedNumbers);

            let statusHTML = Object.keys(localGuessedNumbers).map(key => {
                let guessStatus = localGuessedNumbers[key].guessed;

                if(guessStatus === 0){
                    return (<span className="soroban-status-item status-empty" key={v4()}/>);
                }else if(guessStatus === -1){
                    return (<span className="soroban-status-item status-red" key={v4()}/>);
                }else if(guessStatus === 1){
                    return (<span className="soroban-status-item status-green" key={v4()}/>);
                }else{
                    return null
                }
            });

            return (
                <div className="soroban-status">
                    {statusHTML}
                </div>
            )
        }else{
            return null;
        }
    };

    getSorobanTasks = () => {
        // console.log(this.state.t);
        if(this.state.t >= 0){
            return (
                <span className="flash-menu-item">
                <span className="progress-title">Заданий осталось:</span>
                <span className="progress-body">
                    {this.state.t === 0 ? 'Неограничено' : this.state.t - this.state.taskTries}
                </span>
            </span>
            )
        }else{
            return null;
        }
    };


    getSorobanInput = () => {

        const { tries, i, taskTries, t, allowInput, guessedNumbers, wholePool } = this.state;


        if(tries === i){

            let anyMistakes = false;

            Object.keys(guessedNumbers).map(key => {
                if(!anyMistakes){
                    if(guessedNumbers[key].guessed === -1){
                        anyMistakes = true;
                    }
                }
                return null;
            });


            // Check tasks
            if(taskTries === t){
                if(this.state.showResults){
                    return <Results toMain={this.handleScreenChange.bind(this)} results={wholePool}/>
                }
                return (
                    <div>
                        <ImpulseFinal mode={!anyMistakes} />
                        <div className="soroban-answer">

                            <div className="soroban-stage">

                                <span
                                    className="clickable"
                                    onClick={this.handleShowResults}
                                >Результаты</span>

                                <span
                                    className="clickable"
                                    onClick={() => this.handleScreenChange(0)}
                                >Выйти на главную</span>

                            </div>
                        </div>
                    </div>
                )
            }

            return (
                <div>
                    <ImpulseFinal mode={!anyMistakes} />
                    <div className="soroban-answer">
                        <div className="soroban-stage">
                            <KeyboardCatcher
                                handler={this.handleNextWave}
                            />
                            <span
                                className="clickable"
                                onClick={this.handleNextWave}
                            >Перейти к следующему заданию</span>
                        </div>
                    </div>
                </div>

            )
        }

        return <AnswerInput
            disabled={!allowInput}
            handler={this.handleSubmitAnswerButton.bind(this)}
        />;
    };

    generateSorobanQuery = (number) => {
        let sorobanBody = number.split('').map((digit) => {
            return (
                <Soroban index={parseInt(digit, 10)} key={v4()}/>
            )

        });

        return (
            <div className="soroban-container">
                {sorobanBody}
            </div>
        );
    };





/**********************************************************************************************************************/
/*********                                                                                                      *******/
/*********                                   DEV MODULES BELOW                                                  *******/
/*********                                                                                                      *******/
/**********************************************************************************************************************/

    getSorobanInfo = () => {
        if(!_DEV) return null;
        const { ns, pns, i, pi, s, ps, t } = this.state;

        return (
            <div className="soroban-info">
                <div>Размер числа: {ns}</div>
                <div>Прогресс числа: {pns?'да':'нет'}</div>
                <div>Импульсов: {i}</div>
                <div>Прогресс импульсов: {pi?'да':'нет'}</div>
                <div>Скорость показа: {s} сек.</div>
                <div>Прогресс скорости: {ps?'да':'нет'}</div>
                <div>Заданий: {t}</div>
            </div>
        )
    };

}

export default connect((store, ownProps) => {
    return {
        user: store.users.entities.get(ownProps.userId)
    }
})(FlashScreenGame);