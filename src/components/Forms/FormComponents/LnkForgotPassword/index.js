import React, { Component } from 'react';

import './LnkForgotPassword.css';

class LnkForgotPassword extends Component {
    render(){
        return (
            <span className='lnk-forgot-pass'>
                <span onClick={this.props.onClick}>Забыли пароль?</span>
            </span>
        )
    }
}

export default LnkForgotPassword;