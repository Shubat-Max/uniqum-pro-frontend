import React, { Component } from 'react';

import UserBar from '../../UserBar';
import RatingContent from './RatingContent';
import SideWidgetPanel from "../../SideWidgetPanel";

class RatingLayout extends Component {
    render(){
        return (
            <div className="content-wrapper">
                <div className="content-offset-1" />
                <div className="content-user-bar">
                    <UserBar />
                    <SideWidgetPanel />
                </div>
                <div className="content-main-page">
                    <RatingContent />
                </div>
                <div className="content-offset-2" />
                <div className="content-offset-1" />
            </div>
        )
    }
}

export default RatingLayout;