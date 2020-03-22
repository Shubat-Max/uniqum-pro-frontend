import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import axios from 'axios';

import './LoginPage.css';
import { systemStartup, authorize } from "../../../actions";

import FldEmail from '../../Forms/FormComponents/FldEmail';
import FldPassword from '../../Forms/FormComponents/FldPassword';
import BtnLogin from '../../Forms/FormComponents/BtnLogin';
import CbxRememberMe from '../../Forms/FormComponents/CbxRememberMe';
import LnkForgotPassword from '../../Forms/FormComponents/LnkForgotPassword'
import LoginError from "../../Errors/LoginError";
import ForgotPasswordModal from '../../Modals/ForgotPasswordModal'



class LoginPage extends Component {
    state = {
        loginErrorDisplay: false,
        loginHighlight: false,
        passwordHighlight: false,
        showForgotPassword: false,
        login: '',
        pwd: ''
    };

    componentDidMount(){
        document.title = "Uniqum | Авторизация";
    }

    render(){
        return (
            <div className='login-wrapper'>

                {this.getForgotPasswordModal()}

                <form action="#" className='login-form'>
                    <div className="logo-placeholder">
                        <div className='logo'>
                            <img src="./assets/img/uniqum-logo.png" alt="Логотип платформы Uniqum"/>
                        </div>
                    </div>

                    {this.getLoginError()}
                    <div className="credentials">
                        <FldEmail
                            changeHandler={this.handlerLoginChange.bind(this)}
                        />
                        <FldPassword
                            changeHandler={this.handlerPwdChange.bind(this)}
                        />
                    </div>
                    <div className="tools">
                        <CbxRememberMe/>
                        <LnkForgotPassword
                            onClick={() => this.modalFPSwitch(true)}
                        />
                    </div>
                    <BtnLogin
                        authorize={() => this.checkIdentity(this.state.login, this.state.pwd)}
                    />
                </form>

                <div className="tech-version">v0.7.5</div>
            </div>
        )
    }



    getLoginError = () => {
        if (this.state.loginErrorDisplay) {
            return (
                <LoginError
                    hideError={() => this.loginErrorSwitch(false)}
                />
            )
        }
    };

    getForgotPasswordModal = () => {
        if (this.state.showForgotPassword){
            return (
                <ForgotPasswordModal
                    onClose={() => this.modalFPSwitch(false)}
                />
            )
        }
    };

    handlerLoginChange = (login) => {
        this.setState({
            login: login.trim()
        })
    };

    handlerPwdChange = (pwd) => {
        this.setState({
            pwd: pwd
        })
    };

    loginErrorSwitch = (state) => {
        this.setState({
            loginErrorDisplay: state
        })
    };

    modalFPSwitch = (state) => {
        this.setState({
            showForgotPassword: state
        });
    };



    checkIdentity = (login, pwd) => {
        // axios.post(`http://localhost:3001/users/auth`, {
        axios.post(`/api/users/auth`, {
                email: login,
                pwd: pwd
            }).then(res => {
                const user = res.data;
                if(user){
                    if(user._id && user.role){
                        this.props.systemStartup(user._id, user.role);
                        this.props.authorize(user);
                        const cookies = new Cookies();
                        cookies.set('UID', user._id, { path: '/' });
                        cookies.set('URID', user.role, { path: '/' });

                        switch(user.role){
                            case 1:
                                this.props.history.push('/admin');
                                break;
                            case 2:
                                this.props.history.push('/trainer');
                                break;
                            case 3:
                                this.props.history.push('/trainee');
                                break;
                            default:
                                this.loginErrorSwitch(true);
                                return null
                        }
                    }
                }
                this.loginErrorSwitch(true);
            })
    }
}



export default connect(null, {
    systemStartup,
    authorize
})(LoginPage);