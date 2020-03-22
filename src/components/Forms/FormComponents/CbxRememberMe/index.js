import React, { Component } from 'react';

import './CbxRememberMe.css';

class CbxRememberMe extends Component {
    state = {
        checked: false
    };

    render(){
        return (
            <label htmlFor="" className='cbx-remember-me'>
                <input onClick={this.switchState} type="checkbox" checked={this.state.checked}/>
                <span onClick={this.switchState}>Запомнить меня</span>
            </label>
        )
    }

    switchState = () => {
        this.setState({
            checked: !this.state.checked
        })
    }
}

export default CbxRememberMe;