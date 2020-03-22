import React, { Component } from 'react';

import UserBar from '../../UserBar';
import SideWidgetPanel from '../../SideWidgetPanel';
import GroupsContent from './GroupsContent';

class GroupsLayout extends Component {
    render(){
        return (
            <div className="content-wrapper">
                <div className="content-offset-1" />
                <div className="content-user-bar">
                    <UserBar />
                    <SideWidgetPanel />
                </div>
                <div className="content-main-page">
                    <GroupsContent />
                </div>
                <div className="content-offset-2" />
                <div className="content-offset-1" />
            </div>
        )
    }
}

export default GroupsLayout;