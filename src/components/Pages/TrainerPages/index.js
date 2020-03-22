import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Cookies from "universal-cookie";

import {systemStartup, loadCurrentUser} from "../../../actions";
import './TrainerPages.css';

import NavBar from '../../NavBar';
import Footer from '../../Footer';
import UserPrefsLayout from '../../Content/UserPrefsLayout';
import GroupPrefsLayout from '../../Content/GroupPrefsLayout';
import GroupsLayout from '../../Content/GroupsLayout';
import TraineesLayout from '../../Content/TraineesLayout';
import ProfileLayout from '../../Content/ProfileLayout';
import TrainerLayout from '../../Content/TrainerLayout';
import LoaderBlankLayout from '../../Content/LoaderBlankLayout';
import RatingLayout from '../../Content/RatingLayout';
import StatisticLayout from '../../Content/StatisticLayout';
import HelpLayout from '../../Content/HelpLayout';



class TrainerPages extends Component {
    render(){
        const {page} = this.props;

        switch(page){
            case 'groups':
            case 'users':
            case 'profile':
            case 'main':
            case 'loader-blank':
            case 'rating':
            case 'statistic':
            case 'help':
            default:
                break;
        }

        return this.userCheck();
    }

    userCheck = () => {
        const cookies = new Cookies();
        const UID = cookies.get('UID');
        const URID = cookies.get('URID');
        if(UID === undefined || URID === undefined){
            // this.props.history.push('/login');
            return (
                <Redirect push to="/login"/>
            );
        }else{
            const {system} = this.props;
            if(!system){
                this.props.systemStartup(UID, URID);
                this.props.loadCurrentUser(UID);
            }
            return this.getPage();
        }
    };

    getPage = () => {
        return (
            <div className='wrapper'>
                <NavBar />
                {this.getContent(this.props.page)}
                <Footer />
            </div>
        )
    };

    getContent = (type) => {
        switch(type){
            case 'groups':          return <GroupsLayout />;
            case 'group-prefs':     return <GroupPrefsLayout id={this.props.id} />;
            case 'users':           return <TraineesLayout />;
            case 'user-prefs':      return <UserPrefsLayout id={this.props.id} />;
            case 'profile':         return <ProfileLayout />;
            case 'main':            return <TrainerLayout />;
            case 'loader-blank':    return <LoaderBlankLayout />;
            case 'rating':          return <RatingLayout />;
            case 'statistic':       return <StatisticLayout />;
            case 'help':            return <HelpLayout />;
            default:                return <div>404</div>
        }
    }
}

export default connect((store) => {
    return {
        system: store.system.entities.get(0)
    }
},{
    systemStartup,
    loadCurrentUser
})(TrainerPages);