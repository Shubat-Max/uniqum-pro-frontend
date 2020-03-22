import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import './NavBar.css';
import NavItem from './NavItem';
import {connect} from "react-redux";
import Cookies from "universal-cookie";

class NavBar extends Component {
    state = {
        logout: false
    };

    render(){
        return (
            <div className="navbar-wrapper">
                <div className="navbar">
                    <div className="nav-offset-1" />

                    <div className="nav-logo">
                        <Link to="/">
                            <img src="/assets/img/uniqum-logo.png" alt="Логотип платформы Uniqum"/>
                            <span>Uniqum <br/> PRO</span>
                        </Link>
                    </div>

                    <div className="nav-left">
                        { this.getBody() }
                        { this.getLogout() }
                    </div>

                    <div className="nav-right" />
                    <div className="nav-offset-1" />
                </div>
            </div>
        )
    }

    getBody = () => {
        return _NAVBARS[this.props.activeUserRole].map(item =>
            <NavItem key={item.title} title={item.title} path={item.path} component={item.component}/>
        );
    };

    getLogout = () => {
        if(this.state.logout){
            return <Redirect to="/login"/>
        }else{
            return (
                <span
                    className="nav-item"
                    onClick={this.logout}
                >выход</span>
            )
        }
    }

    logout = () => {
        const cookies = new Cookies();
        cookies.remove('UID', {path: '/'});
        cookies.remove('URID', {path: '/'});
        this.setState({
            logout: true
        });
    }
}



const _NAVBARS = {
    1: [
        {
            title:"группы",
            path: "groups"
        },
        {
            title:"ученики",
            path: "users"
        },
        {
            title:"статистика",
            path: "statistic"
        },
        {
            title:"рейтинг",
            path: "rating"
        },
        {
            title:"помощь",
            path: "help"
        },
    ],
    2: [
        {
            title:"группы",
            path: "groups"
        },
        {
            title:"ученики",
            path: "users"
        },
        {
            title:"статистика",
            path: "statistic"
        },
        {
            title:"рейтинг",
            path: "rating"
        },
        {
            title:"помощь",
            path: "help"
        },
    ],
    3: [
        {
            title:"моя группа",
            path: "mygroup"
        },
        {
            title:"статистика",
            path: "statistic"
        },
        {
            title:"рейтинг",
            path: "rating"
        },
        {
            title:"помощь",
            path: "help"
        },
    ]
};





export default connect(store => {
    return {
        activeUserRole: store.system.entities.get(0).role
    }
})(NavBar);