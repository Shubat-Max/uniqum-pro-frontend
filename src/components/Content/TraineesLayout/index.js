import React, { Component } from 'react';

import UserBar from '../../UserBar';
import TraineesContent from './TraineesContent';
import SideWidgetPanel from "../../SideWidgetPanel";

class TraineesLayout extends Component {
    render(){
        return (
            <div className="content-wrapper">
                <div className="content-offset-1" />
                <div className="content-user-bar">
                    <UserBar />
                    <SideWidgetPanel />
                </div>
                <div className="content-main-page">
                    <TraineesContent />
                </div>
                <div className="content-offset-2" />
                <div className="content-offset-1" />
            </div>
        )
    }
}

export default TraineesLayout;