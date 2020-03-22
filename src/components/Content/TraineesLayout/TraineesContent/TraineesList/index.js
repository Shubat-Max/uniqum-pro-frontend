import React, { Component } from 'react';
import { connect } from 'react-redux';

import {loadAllUsers3} from '../../../../../actions'
import {mapToArr} from "../../../../../helpers";

import './TraineesList.css';
import TraineesItem from './TraineesItem';
import Loader from "../../../../Loader";


class TraineesList extends Component {

    componentDidMount(){
        // this.props.loadAllTrainees();
        this.props.loadAllUsers3();
    }

    render(){
        return (
            <div className="trainee-list">
                { this.getHeader() }
                { this.getBody() }
            </div>

        )
    }

    getBody = () => {
        const {users, loading, loaded} = this.props;

        if (loading && !loaded) {
            return <Loader/>
        } else if(!loading && loaded) {
            return mapToArr(users).sort((a, b) => {
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;
            }).map(user => {
                if (user.role === 3)
                    return <TraineesItem id={user._id} key={user._id} groupId={user.memberOf}/>
                else return null;
            });
        }else{
            return null;
        }
    };

    getHeader = () => {
        return (
            <div className="trainee-list-header-row">
                <div className="trainee-list-header-item">&nbsp;</div>
                <div className="trainee-list-header-item">ФИО</div>
                <div className="trainee-list-header-item">Группа</div>
                <div className="trainee-list-header-item">Подробнее</div>
            </div>
        )
    };
 }

export default connect( store => {
    return {
        users: store.users.entities,
        loading: store.users.loading,
        loaded: store.users.loaded,
    }
},{
    loadAllUsers3
})(TraineesList);