import React, { Component, Fragment } from 'react';

import './FldPassword.css';

class FldPassword extends Component {
    state = {
        pwd: ''
    };

    render(){
        return (
            <Fragment>
                <label htmlFor="password" className='fld-pass-lbl'>пароль</label>
                <input
                    type="password"
                    id='password'
                    className='fld-pass-npt'
                    value={this.state.pwd}
                    onChange={this.onChangeHandler}
                />
            </Fragment>
        )
    }

    onChangeHandler = (evt) => {
        this.setState({
            pwd: evt.target.value
        });
        this.props.changeHandler(evt.target.value);
    };
}

export default FldPassword;