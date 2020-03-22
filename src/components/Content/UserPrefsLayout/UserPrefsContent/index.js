import React, { Component } from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

import {loadUser} from "../../../../actions";
import Loader from '../../../Loader'

import './UserPrefsContent.css';
import '../../common.css';



class UserPrefsContent extends Component {
    state = {
        dangerZoneOpen: false
    };

    componentDidMount(){
        if(!this.props.user){
            this.props.loadUser(this.props.id);
        }
    }

    render(){
        return (
            <div className="main-block">
                {this.getBody()}
            </div>
        )
    }

    getBody = () => {
        const {user, loading, loaded} = this.props;

        if(loading && !loaded){
            return <Loader />
        }else if(!loading && loaded){
            return (
                <div className="main-block-body">
                    <div className="uprofile-page___head">
                        Профиль: {user.name}
                    </div>
                    <div className="body">
                        <div className="body-left">
                            <div className="inner-left">
                                <div className="input-block">
                                    <label htmlFor="name" className="input-lbl">Имя пользователя</label>
                                    <input type="text" id="name" placeholder={user.name} />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="name" className="input-lbl">Электронная почта</label>
                                    <input type="text" id="name" disabled placeholder={user.email} />
                                        <div className="hint">* Для смены электронной почты привязанной к аккаунту
                                            обратитесь к администратору сайта.
                                        </div>
                                </div>

                                {this.getOptionChangePassword()}

                                <span className="act-change-pwd-usr">Сохранить</span>
                            </div>

                        </div>
                        <div className="body-right">
                            <div className="inner-right">
                                <div>
                                    <img
                                        src="http://img03.deviantart.net/ac7d/i/2016/239/d/4/shani_by_merwild-daffv6n.jpg"
                                        alt="" />
                                </div>
                                <input type="file" />
                            </div>
                        </div>
                    </div>

                    <div className="tools">
                        {this.getLinkToGroup()}
                        {this.getLinkToStats()}
                        {this.getLinkToRating()}
                    </div>

                    {this.getDangerZone()}

                </div>
            )
        }else{
            return null;
        }
    };

    getLinkToGroup = () => {
        const {user} = this.props;
        if(user.memberOf !== null){
            return (
                <Link to={`/groups/${user.memberOf}`}><span className="user-details">Группа пользователя</span></Link>
            )
        }else{
            return (
                <Link to={`/groups`}><span className="user-details">Назначить группу</span></Link>
            )
        }
    };

    getLinkToStats = () => {
        return (
            <Link to={`/statistic/${this.props.user._id}`}><span className="user-details">Статистика пользователя</span></Link>
        )
    };

    getLinkToRating = () => {
        return (
            <Link to={`/rating/${this.props.user._id}`}><span className="user-details">Рейтинг пользователя</span></Link>
        )
    };

    getOptionChangePassword = () => {
        if(this.props.system._id === this.props.id){
            return (
                <div className="input-block">
                    <div>
                        <label htmlFor="pwd-user" className="input-lbl">Смена пароля</label>
                        <input type="text" id="pwd-user" placeholder="введите новый пароль"
                               className="change-pwd" />
                    </div>
                    <div>
                        <input type="text" id="pwd-user-rpt" placeholder="повторите новый пароль" />
                    </div>
                </div>
            )
        }else{
            return null;
        }
    };

    handleDangerZoneClick = () => {
        this.setState({
            dangerZoneOpen: !this.state.dangerZoneOpen
        })
    };

    getDangerZone = () => {
        if(this.props.user.role === 3){
            if(this.state.dangerZoneOpen){
                return (
                    <div className="danger-zone">
                        <div className="danger-zone-header" onClick={this.handleDangerZoneClick}>
                            Опасная зона
                        </div>
                        <div className="danger-zone-body">
                            <div className="danger-zone-block">
                                <div className="danger-zone-block-left">
                                    <div className="danger-zone-block-title">Заморозить / Разморозить аккаунт</div>
                                    <div className="danger-zone-block-descr">Описание приостановки аккаунта - Описание
                                        приостановки аккаунта - Описание приостановки аккаунта - Описание приостановки
                                        аккаунта
                                    </div>
                                </div>
                                <div className="danger-zone-block-right">
                                    {this.getFreezeAction()}


                                </div>
                            </div>

                            <div className="danger-zone-block">
                                <div className="danger-zone-block-left">
                                    <div className="danger-zone-block-title">Удалить аккаунт</div>
                                    <div className="danger-zone-block-descr">Описание удаления аккаунта - Описание
                                        процесса удаления аккаунта и последствий - Описание процесса удаления аккаунта и
                                        последствий - Описание процесса удаления аккаунта и последствий - Описание
                                        процесса удаления аккаунта и последствий
                                    </div>
                                </div>
                                <div className="danger-zone-block-right">
                                    <span className="act-suspend">Удалить</span>
                                </div>
                            </div>

                            <div className="danger-zone-block">
                                <div className="danger-zone-block-left">
                                    <div className="danger-zone-block-title">Сменить пароль</div>
                                    <div className="danger-zone-block-descr">Описание процесса смены пароля - Описание
                                        процесса смены пароля - Описание процесса смены пароля - Описание процесса смены
                                        пароля
                                    </div>
                                </div>
                                <div className="danger-zone-block-right">
                                    <div>
                                        <label htmlFor="pwd" />
                                        <input type="text" id="pwd" placeholder="введите новый пароль" />
                                    </div>
                                    <div>
                                        <label htmlFor="pwd-rpt" />
                                        <input type="text" id="pwd-rpt" placeholder="повторите новый пароль" />
                                    </div>
                                    <span className="act-change-pwd">Изменить</span>
                                </div>
                            </div>

                        </div>
                    </div>
                )
            }else{
                return (
                    <div className="danger-zone-closed">
                        <div className="danger-zone-header" onClick={this.handleDangerZoneClick}>
                            Опасная зона
                        </div>
                    </div>
                )
            }
        }else{
            return null;
        }
    };

    getFreezeAction = () => {
        if(this.props.user.active){
            return (
                <span className="act-freeze">Заморозить</span>
            )
        }else{
            return (
                <span className="act-unfreeze">Разморозить</span>
            )
        }
    }
}

export default connect((store, ownProps) => {
    return {
        user: store.users.entities.get(ownProps.id),
        system: store.system.entities.get(0),
        loading: store.users.loading,
        loaded: store.users.loaded
    }
},{
    loadUser
})(UserPrefsContent);