import React, { Component } from 'react';

import UserBar from '../../UserBar';
import SideWidgetPanel from '../../SideWidgetPanel';
import GroupPrefsContent from './GroupPrefsContent';

class GroupPrefsLayout extends Component {
    render(){
        return (
            <div className="content-wrapper">
                <div className="content-offset-1" />
                <div className="content-user-bar">
                    <UserBar />
                    <SideWidgetPanel />
                </div>
                <div className="content-main-page">
                    <GroupPrefsContent groupId={this.props.id}/>
                </div>
                <div className="content-offset-2" />
                <div className="content-offset-1" />
            </div>
        )
    }
}

export default GroupPrefsLayout;