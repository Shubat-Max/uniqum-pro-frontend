import React, { Component } from 'react';

import './ImpulseFinal.css';

class ImpulseFinal extends Component {
    /*
    * this.props.mode: true / false
    * this.props.handler: go to next wave
    */
    state = {
        a: false
    }

    render(){
        if(this.props.mode){
            return this.getCongrats();
        }else{
            return this.getCheers();
        }
    }

    getCongrats = () => {
        function getRandomInt(min, max) {
            if(max === 0) return 0;
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let sticker = '';
        if(_CongratStickers.length === 1){
            sticker = (
                <img src={`/assets/img/${_CongratStickers[0]}`} alt=""/>
            )
        }else if(_CongratStickers.length > 1){
            let randomIndex = getRandomInt(0, _CongratStickers.length-1);
            sticker = (
                <img src={`/assets/img/${_CongratStickers[randomIndex]}`} alt=""/>
            )
        }

        let text = '';
        if(_CongratTexts.length === 1){
            text = _CongratTexts[0];
        }else if(_CongratTexts.length > 1){
            let randomIndex = getRandomInt(0, _CongratTexts.length-1);
            text = _CongratTexts[randomIndex];
        }

        let audio = new Audio('/assets/audio/success.mp3');
        audio.play();

        return (
            <div className="soroban-congrats">
                <div className="soroban-congrats-text">
                    {text}
                </div>
                <div className="soroban-congrats-img">
                    {sticker}
                </div>
            </div>
        )
    };

    getCheers = () => {
        function getRandomInt(min, max) {
            if(max === 0) return 0;
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let sticker = '';
        if(_CheersStickers.length === 1){
            sticker = (
                <img src={`/assets/img/${_CheersStickers[0]}`} alt=""/>
            )
        }else if(_CheersStickers.length > 1){
            let randomIndex = getRandomInt(0, _CheersStickers.length-1);
            sticker = (
                <img src={`/assets/img/${_CheersStickers[randomIndex]}`} alt=""/>
            )
        }

        let text = '';
        if(_CheersTexts.length === 1){
            text = _CheersTexts[0];
        }else if(_CheersTexts.length > 1){
            let randomIndex = getRandomInt(0, _CheersTexts.length-1);
            text = _CheersTexts[randomIndex];
        }

        let audio = new Audio('/assets/audio/error.mp3');
        audio.play();

        return (
            <div className="soroban-congrats">
                <div className="soroban-congrats-text">
                    {text}
                </div>
                <div className="soroban-congrats-img">
                    {sticker}
                </div>
            </div>
        )
    };
}

const _CongratStickers = [
    'horn-rabbid-sticker.png',
    'cake1-rabbid-sticker.png'
];

const _CongratTexts = [
    // 'Отличная работа!',
    // 'Верно! Так держать!',
    // 'Молодец!',
    'Ты настоящий мастер!',
    'Ты умеешь справляться со сложными заданиями!',
    'Твои успехи вдохновляют!',
    'Получилось! Мы в тебя верили!',
    'Отличный результат!',
    'Правильно! Старайся и дальше!',
    'Круто! Ты на верном пути!',
    'Сильно! Это впечатляет!'
];


const _CheersStickers = [
    'chicken-rabbid-sticker.png',
    'two-vantus-rabbid-sticker.png'
];

const _CheersTexts = [
    // 'Не унывай! Попробуй ещё раз!',
    // 'Получится в следующий раз!',
    'Всё получится, главное - старайся!',
    'В следующий раз найди правильное решение!',
    'Кто трудится, у того всё получится!',
    'Будь настойчив, и успех придёт!',
    'Терпение и труд всё перетрут!',
    'Кто старается, у того всё получается!',
    'Будь внимателен!',
    'Не сдавайся, а старайся!',
    'Успех приходит к настойчивым!',
    'И чемпионы порой проигрывают!'
];


export default ImpulseFinal;