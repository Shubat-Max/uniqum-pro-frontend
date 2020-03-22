import React, { Component } from 'react';
import { connect } from 'react-redux';

import './TraineesItem.css';
import {Link} from "react-router-dom";
import {getDetails} from "../../../../../../actions";



class TraineesItem extends Component {
    render(){
        const {user} = this.props;

        return (
            <div className="trainee-row">
                <div className="trainee-item">
                    <img src={`/assets/img/${user.avatar ? user.avatar : 'no-user-img.png'}`} alt="User Avatar"/>
                </div>
                <div className="trainee-item">
                    <Link to={`/users/${user._id}`}>
                        { user.name }
                    </Link>
                 </div>
                <div className="trainee-item">
                    {this.getGroupLink()}
                </div>
                <div className="trainee-item">
                    <span className="trainee-item-well">Перейти</span></div>
            </div>
        )
    }

    getGroupLink = () => {

        const {groupId, group} = this.props;

        if(!groupId){
            return (
                <Link to={`/groups`}>
                    <span className="trainee-item-well">Назначить</span>
                </Link>
            )
        }else{
            if(group){
                return (
                    <Link to={`/groups/${groupId}`}>
                        <span className="trainee-item-well">{group.name}</span>
                    </Link>
                )
            }else{
                this.props.getDetails(groupId);
                return (
                    <span className="trainee-item-well">
                        Загрузка...
                    </span>
                )
            }
        }

        // if(group){
        //     return (
        //         <Link to={`/groups/${group._id}`}>
        //             <span className="trainee-item-well">{group.title}</span>
        //         </Link>
        //     )
        // }else{
        //     return (
        //         <Link to={`/groups`}>
        //             <span className="trainee-item-well">Назначить Назначить Назначить Назначить</span>
        //         </Link>
        //     )
        // }
    }
}


export default connect((store, ownProps) => {
    return {
        user: store.users.entities.get(ownProps.id),
        group: store.groups.entities.get(ownProps.groupId)
    }
},{
    getDetails
})(TraineesItem);
