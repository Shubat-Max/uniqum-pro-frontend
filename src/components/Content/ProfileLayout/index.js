import React, { Component } from 'react';

import UserBar from '../../UserBar';
import ProfileContent from './ProfileContent';
import SideWidgetPanel from "../../SideWidgetPanel";
import {connect} from "react-redux";

class ProfileLayout extends Component {
    render(){
        return (
            <div className="content-wrapper">
                <div className="content-offset-1" />
                <div className="content-user-bar">
                    <UserBar />
                    <SideWidgetPanel />
                </div>
                <div className="content-main-page">
                    <ProfileContent id={this.props.currentUser._id} role={this.props.currentUser.role}/>
                </div>
                <div className="content-offset-2" />
                <div className="content-offset-1" />
            </div>
        )
    }
}

export default connect(store => {
    return {
        currentUser: store.system.entities.get(0)
    }
})(ProfileLayout);

