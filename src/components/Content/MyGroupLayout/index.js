import React, { Component } from 'react';
import {connect} from 'react-redux';

import UserBar from '../../UserBar';
import SideWidgetPanel from '../../SideWidgetPanel';
import MyGroupContent from './MyGroupContent';

class MyGroupLayout extends Component {
    render(){
        return (
            <div className="content-wrapper">
                <div className="content-offset-1" />
                <div className="content-user-bar">
                    <UserBar />
                    <SideWidgetPanel />
                </div>
                <div className="content-main-page">
                    {this.getContent()}
                </div>
                <div className="content-offset-2" />
                <div className="content-offset-1" />
            </div>
        )
    }

    getContent = () => {
        const { loading, loaded, user} = this.props;

        if(loading && !loaded || user === undefined){
            return null;
        }else{
            return <MyGroupContent groupId={user.memberOf}/>;
        }
    }
}

export default connect(store => {
    return {
        user: store.users.entities.get(store.system.entities.get(0)._id),
        loading: store.users.loading,
        loaded: store.users.loaded
    }
})(MyGroupLayout);