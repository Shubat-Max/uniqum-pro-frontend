import React, { Component } from 'react';
import { connect } from 'react-redux';

import {loadOwnedGroups} from '../../../../../actions'
import {mapToArr} from "../../../../../helpers";

import './GroupList.css';
import GroupItem from './GroupItem';
import Loader from '../../../../Loader';



class GroupList extends Component {
    
    componentDidMount(){
        this.props.loadOwnedGroups(this.props.id);
    }

    render(){
        return (
            <div className="group-list">
                {this.getHeader()}
                {this.getBody()}
            </div>
        )
    }

    getBody = () => {
        const {loading, loaded, groups} = this.props;
        if(loading && !loaded){
            return (
                <Loader />
            )
        }else if(loaded && !loading){
            return mapToArr(groups).sort((a, b) => {
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;
            }).filter(group => group.ownedBy === this.props.system._id).map(group => {
                return <GroupItem groupId={group._id} key={group._id}/>
            });
        }
    };

    getHeader = () => {
        return (
            <div className="group-list-header">
                <div className="group-list-header-item">Группа</div>
                <div className="group-list-header-item">Учеников</div>
                <div className="group-list-header-item">Статистика</div>
                <div className="group-list-header-item">Параметры ДЗ</div>
            </div>
        )
    };
}

export default connect( store => {
    return {
        groups: store.groups.entities,
        loading: store.groups.loading,
        loaded: store.groups.loaded,
        system: store.system.entities.get(0)
    }
},{
    loadOwnedGroups
})(GroupList);







// export default connect( store => {
//         return {
//             groups: store.groups.entities
//         }
//     },{
//         loadAllGroups
// })(GroupList);