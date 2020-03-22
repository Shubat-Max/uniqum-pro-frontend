import React, { Component } from 'react';

import {mapToArr} from "../../../../../helpers";

import './MemberSettings.css';
import {connect} from "react-redux";
import {loadAllUsers3, changeUserGroup, removeUserGroup} from '../../../../../actions'
import Loader from "../../../../Loader";


class MemberSettings extends Component {

    componentDidMount() {
        this.props.loadAllUsers3();
    }

    render(){
        return (
            <div className="edit-group-prefs___settings-body">
                {this.getBody()}
            </div>
        )
    }



    getBody = () => {
        return (
            <div>
                <div className="edit-group-prefs___settings-block">
                    <div className="edit-group-prefs___npt-lbl">Добавить участника</div>
                    <div className="edit-group-prefs___parts-group">
                        { this.getTrainees() }
                    </div>
                </div>

                <div className="edit-group-prefs___settings-block">
                    <div className="edit-group-prefs___npt-lbl">Список участников</div>
                    <div className="edit-group-prefs___parts-group">
                        { this.getParticipants() }
                    </div>
                </div>
            </div>
        )
    };



    getTrainees = () => {
        const otherParts = mapToArr(this.props.users).filter(
            user => (user.memberOf !== this.props.groupId && user.role === 3 && user.invitedBy === this.props.systemId)
        ).sort((a, b) => {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });

        if(this.props.loading && !this.props.loaded) return <Loader />;

        if(otherParts.length){
            return otherParts.map(user => {
                return <div className="edit-group-prefs___part" key={user._id}>
                    <span>{user.name}</span>
                    { this.getActionButton(user) }
                </div>
            });
        }else{
            return <div className="edit-group-prefs___no-parts">Нет участников для добавления</div>;
        }
    };

    getActionButton = (user) => {
        if(!user.memberOf){
            return (
                <span
                    className="edit-group-prefs___add-part"
                    title="Добавить пользователя в текущую группу"
                    onClick={() => this.addParticipant(user._id)}
                ><span/></span>
            )
        }else{
            return (
                <span
                    className="edit-group-prefs___relocate-part"
                    title="Перенести пользователя в текущую группу"
                    onClick={() => this.addParticipant(user._id)}
                ><span/></span>
            )
        }
    };

    addParticipant = (userId) => {
        this.props.changeUserGroup(userId, this.props.groupId);
    };



    getParticipants = () => {
        const currentParts = mapToArr(this.props.users).sort((a, b) => {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        }).filter(
            user => (user.memberOf === this.props.groupId && user.role === 3)
        );

        if(this.props.loading && !this.props.loaded) return <Loader />;

        if(currentParts.length){
            return currentParts.map(user => {
                return (
                    <div className="edit-group-prefs___part" key={user._id}>
                        <span>{user.name}</span>
                        <span
                            className="edit-group-prefs___dismiss-part"
                            title="Удалить пользователя из группы"
                            onClick={() => this.removeParticipant(user._id)}
                        >
                            <span/>
                        </span>
                    </div>
                )
            })
        }else{
            return <div className="edit-group-prefs___no-parts">В группе нет участников</div>;
        }
    };

    removeParticipant = (userId) => {
        this.props.removeUserGroup(userId);
    };
}

export default connect(store => {
    return {
        users: store.users.entities,
        loading: store.users.loading,
        loaded: store.users.loaded,
        systemId: store.system.entities.get(0)._id
    }
}, {
    loadAllUsers3,
    changeUserGroup,
    removeUserGroup
})(MemberSettings);