import React, { Component } from 'react';
import { generate } from 'generate-password'

import './TrainerContent.css';
import '../../common.css';
import {connect} from "react-redux";
import {addGroup, createUser, loadOwnedGroups} from "../../../../actions";
import {Link} from "react-router-dom";
import {mapToArr} from "../../../../helpers";
import Loader from "../../../Loader";



class TrainerContent extends Component {
    state = {
        showTcgNtf: false,
        showTiuNtf: false,
        newGroupName: '',
        newUserName: '',
        newUserEmail: '',

        createGroupSuccess: false,
        createGroupDangerStatus: 0,
        inviteUserSuccess: false,
        inviteUserDangerStatus: 0
    };

    componentDidMount(){
        this.props.loadOwnedGroups(this.props.system._id);
    }

    render(){
        document.title = 'Uniqum Platform | Главная';
        return (
            <div className="main-block">
                <div className="main-block-body">
                    {this.getWidgetGroups()}
                    <div className="widget-col-2">
                        {this.getWidgetInviteUser()}
                        {this.getWidgetCreateGroup()}
                    </div>
                </div>
            </div>
        )
    }

    getWidgetGroups = () => {
        return (
            <div className="widget-tg">
                <div className="widget-tg-header">Список активных групп</div>
                <div className="widget-tg-list">
                    { this.getWidgetGroupItems() }
                </div>
            </div>
        )
    };

    getWidgetGroupItems = () => {
        const {loading, loaded, groups} = this.props;

        if(loading && !loaded){
            return (
                <Loader />
            )
        }else if(loaded && !loading){
            let filteredGroups = mapToArr(groups).filter(group => group.ownedBy === this.props.system._id);

            if(filteredGroups !== undefined &&  filteredGroups.length > 0){
                return filteredGroups
                    .sort((a, b) => {
                        if(a.name < b.name) return -1;
                        if(a.name > b.name) return 1;
                        return 0;
                    })
                    .map(group => {
                        return (
                            <div className="widget-tg-list-row" key={group._id}>
                                <span className="widget-tg-list-item">
                                    <Link to={`/groups/${group._id}`}>
                                        {group.name}
                                    </Link>
                                </span>
                                <span className="widget-tg-list-item">
                                    <Link to={`/statistic/${group._id}`}>
                                        <span className="widget-tg-well">
                                            Статистика
                                        </span>
                                    </Link>
                                </span>
                                <span className="widget-tg-list-item">
                                    <Link to={`/groups/${group._id}`}>
                                        <span className="widget-tg-well">
                                            Настройки
                                        </span>
                                    </Link>
                                </span>
                            </div>
                        )
                    })
            }else{
                return <div className="widget-tg-no-items">Не найдено активных групп.</div>
            }
        }
    };

    getWidgetInviteUser = () => {
        return (
            <div className="widget-tiu">
                <div className="widget-tiu-header">Пригласить ученика</div>
                <div className="widget-tiu-body">

                    {this.getSuccessInviteUser()}
                    {this.getDangerInviteUser()}




                    <div className="widget-tiu-npt-block">
                        <label htmlFor="" className="widget-tiu-npt-title">Имя, Фамилия</label>
                        <input type="text" value={this.state.newUserName} onChange={this.handleInputChange('newUserName')}/>
                    </div>
                    <div className="widget-tiu-npt-block">
                        <label htmlFor="" className="widget-tiu-npt-title">Электронная почта</label>
                        <input type="text" value={this.state.newUserEmail} onChange={this.handleInputChange('newUserEmail')}/>
                    </div>
                    <div className="widget-tiu-attention">
                        * Пароль будет сгенерирован автоматически.
                    </div>
                    <div className="widget-tiu-controls">
                        <div
                            className="widget-tiu-controls-item"
                            onClick={this.handleInviteNewUser}
                        >Пригласить</div>
                    </div>

                </div>
            </div>
        )
    };



    getWidgetCreateGroup = () => {
        return (
            <div className="widget-tcg">
                <div className="widget-tcg-header">Создать группу</div>
                <div className="widget-tcg-body">

                    {this.getSuccessCreateGroup()}
                    {this.getDangerCreateGroup()}

                    <div className="widget-tcg-npt-block">
                        <label htmlFor="" className="widget-tcg-npt-title">Название группы</label>
                        <input type="text" value={this.state.newGroupName} onChange={this.handleInputChange('newGroupName')}/>
                    </div>

                    <div className="widget-tcg-controls">
                        <div
                            className="widget-tcg-controls-item"
                            onClick={this.handleCreateNewGroup}
                        >Создать</div>
                    </div>

                </div>
            </div>
        )
    };



    getSuccessCreateGroup = () => {
        if(this.state.createGroupSuccess){
            return (
                <div className="widget-tcg-notification">
                    <div className="widget-tcg-notification-body widget-notification-green">
                        Группа успешно создана
                    </div>
                </div>
            )
        }else return null;
    };

    getDangerCreateGroup = () => {
        if(this.state.createGroupDangerStatus){

            let notification = '';
            switch(this.state.createGroupDangerStatus){
                case 1: notification = 'Все поля должны быть заполнены'; break;
                case 2: notification = 'Поле "Название группы" должно содержать 3 или более символов'; break;
                default: notification = 'Упс... Что-то пошло не так';
            }

            return (
                <div className="widget-tcg-notification">
                    <div className="widget-tcg-notification-body widget-notification-red">
                        {notification}
                    </div>
                </div>
            )
        }else return null;
    };


    handleCreateNewGroup = () => {
        let newGroupName = this.state.newGroupName.trim();

        if(newGroupName === ''){
            this.setState({
                createGroupSuccess: false,
                createGroupDangerStatus: 1
            })
        }else if(newGroupName.length < 3){
            this.setState({
                createGroupSuccess: false,
                createGroupDangerStatus: 2
            })
        }else{
            this.props.addGroup(newGroupName, this.props.system._id);

            this.setState({
                createGroupDangerStatus: 0,
                createGroupSuccess: true
            });

            setTimeout(function() {
                this.setState({
                    createGroupSuccess: false,
                    newGroupName: ''
                });
            }.bind(this), 3000);
        }
    };








    getSuccessInviteUser = () => {
        if(this.state.inviteUserSuccess){
            return (
                <div className="widget-tiu-notification">
                    <div className="widget-tiu-notification-body widget-notification-green">
                        Приглашение успешно выслано! Пользователь будет зарегистрирован в системе после подтверждения почтового адреса указанного в приглашении
                    </div>
                </div>
            )
        }else return null;
    };

    getDangerInviteUser = () => {
        if(this.state.inviteUserDangerStatus){

            let notification = '';
            switch(this.state.inviteUserDangerStatus){
                case 1: notification = 'Все поля должны быть заполнены'; break;
                case 2: notification = 'Поле "Имя, Фамилия" должно содержать 3 или более символов'; break;
                case 3: notification = 'Неверный формат email'; break;
                default: notification = 'Упс... Что-то пошло не так';
            }

            return (
                <div className="widget-tiu-notification">
                    <div className="widget-tiu-notification-body widget-notification-red">
                        {notification}
                    </div>
                </div>
            )
        }else return null;
    };

    handleInviteNewUser = () => {
        // eslint-disable-next-line
        const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let newUserName = this.state.newUserName.trim();
        let newUserEmail = this.state.newUserEmail.trim();

        if(newUserEmail.length === 0 || newUserEmail === '' || newUserName.length === 0 || newUserName === ''){
            this.setState({
                inviteUserSuccess: false,
                inviteUserDangerStatus: 1
            })
        }else if(newUserName.length < 3){
            this.setState({
                inviteUserSuccess: false,
                inviteUserDangerStatus: 2
            })
        }else if(!emailValidator.test(String(newUserEmail).toLowerCase())){
            this.setState({
                inviteUserSuccess: false,
                inviteUserDangerStatus: 3
            })
        }else{

            let newPwd = generate({
                length: 10,
                numbers: true
            });

            this.props.createUser({
                name: newUserName,
                email: newUserEmail,
                role: 3,                                        //3 is for trainee role
                pwd: newPwd,
                invitedBy: this.props.system._id
            });

            this.setState({
                inviteUserSuccess: true,
                inviteUserDangerStatus: 0
            });

            setTimeout(function() {
                this.setState({
                    inviteUserSuccess: false,
                    newUserName: '',
                    newUserEmail: ''
                });
            }.bind(this), 10000);
        }
    };













    handleInputChange = type => evt => {
        this.setState({
            [type]: evt.target.value
        })
    };
}

export default connect(store => {
    return {
        groups: store.groups.entities,
        loading: store.groups.loading,
        loaded: store.groups.loaded,
        system: store.system.entities.get(0)
    }
},{
    loadOwnedGroups,
    addGroup,
    createUser
})(TrainerContent);