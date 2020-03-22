// LoaderBlankLayout
import React, { Component } from 'react';

import UserBar from '../../UserBar';
import LoaderBlankContent from './LoaderBlankContent';
import SideWidgetPanel from "../../SideWidgetPanel";

class LoaderBlankLayout extends Component {
    render(){
        return (
            <div className="content-wrapper">
                <div className="content-offset-1" />
                <div className="content-user-bar">
                    <UserBar />
                    <SideWidgetPanel />
                </div>
                <div className="content-main-page">
                    <LoaderBlankContent />
                </div>
                <div className="content-offset-2" />
                <div className="content-offset-1" />
            </div>
        )
    }
}

export default LoaderBlankLayout;