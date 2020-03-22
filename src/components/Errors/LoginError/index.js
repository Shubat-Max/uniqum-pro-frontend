import React, { Component } from 'react';

import './LoginError.css';

class LoginError extends Component {
    render(){
        return (
            <div className='login-error'>

                <div className='login-error-label'>
                    Логин или пароль не верные.
                </div>

                <div className='login-error-controls'>
                    <div className='login-error-hide' onClick={this.hideError}><span></span></div>
                </div>

            </div>
        )
    }

    hideError = () => {
        this.props.hideError();
    }
}

export default LoginError;