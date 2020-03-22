import React, { Component } from 'react';

import './QuestsSettings.css';
import FlashSettings from './FlashSettings';


class QuestsSettings extends Component {
    render(){
        return (
            <div className="quest-settings-wrappper">

                {this.getFlashSettings()}

                <div className="quest-settings-panel">
                    <div className="quest-settings-head">
                        <span className="quest-settings-title">Столбцы</span>
                        <span className="quest-settings-edit">Редактировать</span>
                    </div>
                    <div className="quest-settings-body">
                        <div className="quest-settings-option">
                            <span className="quest-settings-option-title">Цифры:</span>
                            <span className="quest-settings-option-selected">
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                                <span>6</span>
                                <span>7</span>
                                <span>8</span>
                                <span>9</span>
                                <span>0</span>
                            </span>
                        </div>
                        <div className="quest-settings-option">
                            <span className="quest-settings-option-title">Размер числа:</span>
                            <span className="quest-settings-option-selected">4</span>
                        </div>
                        <div className="quest-settings-option">
                            <span className="quest-settings-option-title">Прогресс размера числа:</span>
                            <span className="quest-settings-option-selected">Да</span>
                        </div>
                        <div className="quest-settings-option">
                            <span className="quest-settings-option-title">Действия:</span>
                            <span className="quest-settings-option-selected">4</span>
                        </div>
                        <div className="quest-settings-option">
                            <span className="quest-settings-option-title">Прогресс действий:</span>
                            <span className="quest-settings-option-selected">Нет</span>
                        </div>
                        <div className="quest-settings-option">
                            <span className="quest-settings-option-title">Заданий:</span>
                            <span className="quest-settings-option-selected">5</span>
                        </div>
                        <div className="quest-settings-option">
                            <span className="quest-settings-option-title">Модуль:</span>
                            <span className="quest-settings-option-selected">Помощь брата 4</span>
                        </div>
                        <div className="quest-settings-option">
                            <span className="quest-settings-option-title">Операции:</span>
                            <span className="quest-settings-option-selected">Сложение + Вычитание</span>
                        </div>
                    </div>
                </div>
                <div className="quest-settings-panel">
                    <div className="quest-settings-head">
                        <span className="quest-settings-title">Уникум</span>
                        <span className="quest-settings-edit">Редактировать</span>
                    </div>
                    <div className="quest-settings-body">
                        <div className="quest-settings-option">
                            <span className="quest-settings-option-title">Цифры:</span>
                            <span className="quest-settings-option-selected">
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                                <span>6</span>
                                <span>7</span>
                                <span>8</span>
                                <span>9</span>
                                <span>0</span>
                            </span>
                        </div>
                        <div className="quest-settings-option">
                            <span className="quest-settings-option-title">Размер числа:</span>
                            <span className="quest-settings-option-selected">3</span>
                        </div>
                        <div className="quest-settings-option">
                            <span className="quest-settings-option-title">Прогресс размера числа:</span>
                            <span className="quest-settings-option-selected">Да</span>
                        </div>
                        <div className="quest-settings-option">
                            <span className="quest-settings-option-title">Действия:</span>
                            <span className="quest-settings-option-selected">4</span>
                        </div>
                        <div className="quest-settings-option">
                            <span className="quest-settings-option-title">Прогресс действий:</span>
                            <span className="quest-settings-option-selected">Нет</span>
                        </div>
                        <div className="quest-settings-option">
                            <span className="quest-settings-option-title">Скорость:</span>
                            <span className="quest-settings-option-selected">2 сек.</span>
                        </div>
                        <div className="quest-settings-option">
                            <span className="quest-settings-option-title">Прогресс скорости:</span>
                            <span className="quest-settings-option-selected">Да</span>
                        </div>
                        <div className="quest-settings-option">
                            <span className="quest-settings-option-title">Заданий:</span>
                            <span className="quest-settings-option-selected">5</span>
                        </div>
                        <div className="quest-settings-option">
                            <span className="quest-settings-option-title">Модуль:</span>
                            <span className="quest-settings-option-selected">Помощь брата 2</span>
                        </div>
                        <div className="quest-settings-option">
                            <span className="quest-settings-option-title">Операции:</span>
                            <span className="quest-settings-option-selected">Сложение + Вычитание</span>
                        </div>
                        <div className="quest-settings-option">
                            <span className="quest-settings-option-title">Комментарий:</span>
                            <span className="quest-settings-option-selected">С закрытыми глазами</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    getFlashSettings = () => {
        return (
            <FlashSettings groupId={this.props.groupId}/>
        );
    };
}

export default QuestsSettings;