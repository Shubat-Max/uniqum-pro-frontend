import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './GroupItem.css';
import {getMembersCount} from "../../../../../../actions";


class GroupItem extends Component {
    render(){
        const {group} = this.props;

        return (
            <div className="group-item">
                <div className="group-item-placeholder">
                    <Link to={`/groups/${group._id}`}>{group.name}</Link>
                </div>
                <div className="group-item-placeholder">{this.getGroupAmount()}</div>
                <div className="group-item-placeholder">Перейти</div>
                <div className="group-item-placeholder">Задать</div>
            </div>
        )
    }

    getGroupAmount = () => {
        const {group} = this.props;
        if(group.count === null){
            //ask about count
            this.props.getMembersCount(group._id);
            return 'загрузка...';
        }else{
            return group.count;
        }
    }
}

export default connect((store, ownProps) => {
    return {
        group: store.groups.entities.get(ownProps.groupId)
    }
},{
    getMembersCount
})(GroupItem);