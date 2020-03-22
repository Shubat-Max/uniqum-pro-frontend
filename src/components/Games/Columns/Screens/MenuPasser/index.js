import React, {Component} from 'react';

import ScreenMenu from '../Menu'
import {connect} from "react-redux";
import {loadUser} from "../../../../../actions";



class MenuPasser extends Component {
    render(){
        if(!this.props.user){
            this.props.loadUser(this.props.userId);
            return (
                <div className="columns-game">
                    Loader...
                </div>
            )
        }else{
            return (
                <ScreenMenu
                    handler={this.props.handler}
                    settingsHandler={this.props.settingsHandler}
                    settings={this.props.settings}
                    user = {this.props.user}
                />
            )
        }


    }
}

export default connect((store, ownProps) => {
    return {
        user: store.users.entities.get(ownProps.userId)
    }
},{
    loadUser
})(MenuPasser);