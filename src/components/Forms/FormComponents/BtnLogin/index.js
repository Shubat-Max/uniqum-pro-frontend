import React, { Component, Fragment } from 'react';



import './BtnLogin.css';

class BtnLogin extends Component {
    render(){
        return (
            <Fragment>
                <div className='btnlogin-btn' onClick={this.clickHandler}>Войти</div>
            </Fragment>
        )

    }

    clickHandler = () => {
        this.props.authorize();
        // this.props.displayError();
        // this.props.checkLoginField();
    };
}

export default BtnLogin;


