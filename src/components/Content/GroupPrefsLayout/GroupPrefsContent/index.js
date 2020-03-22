import React, { Component } from 'react';
import { connect } from 'react-redux';

import {updateGroupCommon, removeUserGroup, changeUserGroup, removeGroup, loadOwnedGroup} from "../../../../actions";

import './GroupPrefsContent.css';
import '../../common.css';
import QuestsSettings from './QuestsSettings';
import MembersSettings from './MembersSettings';


import Loader from "../../../Loader";



class GroupsContent extends Component {
    state = {
        groupTitle: '',
        commonOpen: false,
        partsOpen: false,
        questsOpen: false
    };


    componentDidMount(){
        if(!this.props.group){
            this.props.loadOwnedGroup(this.props.userId, this.props.groupId);
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
        const { loading, loaded, group} = this.props;

        if (loading && !loaded) {
            return (
                <Loader />
            )
        }else if ((loaded && !loading) || (!loaded && !loading && group)) {
            return (
                <div>
                    <div className="main-block___head">Подробности о группе: <span>{group.name}</span></div>
                    <div className="main-block-body">
                        <div className="edit-group-prefs___settings-block">
                            <div
                                className={`no-select ${this.state.commonOpen?"edit-group-prefs___settings-head-active":"edit-group-prefs___settings-head"}`}
                                onClick={this.handleClickSettingsBlock('common')}>
                                Общие настройки
                            </div>
                            { this.getSettingsBlock('common') }
                        </div>

                        <div className="edit-group-prefs___settings-block">
                            <div
                                className={`no-select ${this.state.partsOpen?"edit-group-prefs___settings-head-active":"edit-group-prefs___settings-head"}`}
                                onClick={this.handleClickSettingsBlock('parts')}>
                                Участники группы
                            </div>
                            { this.getSettingsBlock('parts') }
                        </div>


                        <div className="edit-group-prefs___settings-block">
                            <div
                                className={`no-select ${this.state.questsOpen?"edit-group-prefs___settings-head-active":"edit-group-prefs___settings-head"}`}
                                onClick={this.handleClickSettingsBlock('quests')}>
                                Настройки заданий
                            </div>
                            { this.getSettingsBlock('quests') }
                        </div>
                    </div>
                </div>
            )
        }

    };

    handleInputChange = type => evt => {
        this.setState({
            [type]: evt.target.value
        })
    };

    handleSaveCommon = () => {
        if(this.state.groupTitle !== ''){
            this.props.updateGroupCommon(this.props.groupId, {
                name: this.state.groupTitle
            });
            document.title = `Uniqum | Группа ${this.state.groupTitle}`;
            this.setState({
                groupTitle: ''
            });
        }
    };

    handleClickSettingsBlock = type => () => {
        const trigger = `${type}Open`;

        this.setState({
            [trigger]: !this.state[trigger]
        })
    };

    getSettingsBlock = type => {

        const trigger = `${type}Open`;
        if(!this.state[trigger]){
            return null;
        }

        switch(type){
            case 'common':
                return (
                    <div className="edit-group-prefs___settings-body">
                        <div className="edit-group-prefs___npt-lbl">Название группы</div>
                        <input
                            type="text"
                            className="edit-group-prefs___npt"
                            placeholder={this.props.group.name}
                            value={this.state.groupTitle}
                            onChange={this.handleInputChange('groupTitle')}
                        />

                        <div className="edit-group-prefs___delete-group">
                            <span
                                onClick={() => this.removeGroup(this.props.groupId)}
                            >Удалить группу</span>
                        </div>

                        <div className="edit-group-prefs___tools">
                            <span
                                className="edit-group-prefs___submit"
                                onClick={this.handleSaveCommon}
                                title="Сохранить изменения"
                            >
                                Сохранить
                            </span>
                        </div>
                    </div>
                );

            case 'parts':
                return (
                    <MembersSettings groupId={this.props.groupId}/>
                );

            case 'quests':
                return (
                    <QuestsSettings groupId={this.props.groupId}/>
                );


            default:
                return null;
        }
    };

    removeGroup = (groupId) => {

        console.log('Remove id:', groupId);

        //redirect to main

        this.props.removeGroup(groupId);


        // this.props.group.userIds.map(userId => {
        //     return this.props.removeUserGroup(userId, this.props.groupId);
        // });
        // this.props.removeGroup(groupId);
    };
}



export default connect((store, ownProps) => {
    return {
        group: store.groups.entities.get(ownProps.groupId),
        loading: store.groups.loading,
        loaded: store.groups.loaded,
        users: store.users.entities,
        userId: store.system.entities.get(0)._id
    }
},{
    updateGroupCommon,
    removeUserGroup,
    changeUserGroup,
    removeGroup,
    loadOwnedGroup
})(GroupsContent);