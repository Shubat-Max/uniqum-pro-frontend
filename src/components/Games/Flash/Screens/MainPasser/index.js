import React, {Component} from 'react';

import ScreenMain from '../Main'
import {connect} from "react-redux";
import {loadUser} from "../../../../../actions";



class MainPasser extends Component {
    render(){
        if(!this.props.user){
            this.props.loadUser(this.props.userId);
            return (
                <div className="flash-game">
                    Loader...
                </div>
            )
        }else{
            return (
                <ScreenMain
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
})(MainPasser);