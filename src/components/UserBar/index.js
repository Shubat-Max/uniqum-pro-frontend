import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

import {loadCurrentUser} from "../../actions";

import './UserBar.css';
import Loader from '../Loader'



class UserBar extends Component {
    componentDidMount(){
        if(!this.props.user){
            this.props.loadCurrentUser(this.props.system._id);
        }
    }

    render(){
        return (
            <div className="user-bar">
                {this.getBody()}
            </div>
        )
    }

    getBody = () => {
        const { loading, loaded } = this.props;
        if(loading && !loaded){
            return <Loader />
        }else if((!loading && loaded) || (!loading && !loaded && this.props.user)){
            return (
                <div className="user-info">
                    <Link to={`/profile`}>
                        <div className="user-avatar">
                            <img src={`/assets/img/${this.props.user.avatar ? this.props.user.avatar : 'no-user-img.png'}`} alt="User Avatar"/>
                        </div>
                        <div className="user-name">
                            { this.props.user.name }
                        </div>
                    </Link>
                </div>
            )
        }
    }
}

export default connect(store => {
    return {
        user: store.users.entities.get(store.system.entities.get(0)._id),
        system: store.system.entities.get(0),
        loading: store.system.loading,
        loaded: store.system.loaded
    }
},{
    loadCurrentUser
})(UserBar);