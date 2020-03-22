import React, { Component } from 'react';
import { connect } from 'react-redux';

import './GroupsContent.css';
import '../../common.css';
import GroupList from './GroupList';
import AddGroupBtn from './AddGroupBtn';


class GroupsContent extends Component {
    render(){
        document.title = 'Uniqum Platform | Группы'
        return (
            <div className="main-block">
                <div className="main-block-body">
                    <AddGroupBtn />
                    <GroupList id={this.props.system._id}/>
                </div>
            </div>
        )
    }
}

export default connect(store => {
    return {
        system: store.system.entities.get(0)
    }
})(GroupsContent);