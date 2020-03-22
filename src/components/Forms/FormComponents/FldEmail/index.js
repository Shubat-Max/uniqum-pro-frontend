import React, { Component, Fragment } from 'react';

import './FldEmail.css';

class FldEmail extends Component {

    state = {
        login: ''
    };

    render(){
        return (
            <Fragment>

                <label
                    htmlFor="login"
                    className='fld-email-lbl'
                >email</label>

                <input
                    type="text"
                    id='login'
                    className='fld-email-npt'
                    value={this.state.login}
                    onChange={this.onChangeHandler}
                />

            </Fragment>
        )
    }

    onChangeHandler = (evt) => {
        let email = evt.target.value.trim();
        this.setState({
            login: email
        });
        this.props.changeHandler(email);
    };
}

export default FldEmail;