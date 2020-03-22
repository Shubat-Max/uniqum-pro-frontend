import React, { Component } from 'react';

import './ProfileContent.css';
import '../../common.css';
import {connect} from "react-redux";
import Loader from "../../../Loader";



class ProfileContent extends Component {
    render(){
        return (
            <div className="main-block">
                {this.getBody()}
            </div>
        )
    }

    getBody = () => {
        const {user, loading, loaded} = this.props;
        if(loading && !loaded){
            return <Loader />
        }else if(!loading && loaded){
             return (
                <div className="main-block-body">
                    <div className="profile-page___head">
                        Профиль: {user.name}
                    </div>
                    <div className="profile-page___body">
                        <div className="profile-page___npt-lbl">Имя пользователя</div>
                        <input type="text"
                               className="profile-page___npt"
                               placeholder={user.name}
                        />

                        <div className="profile-page___npt-lbl">Электронная почта</div>
                        <input type="text" className="profile-page___npt" placeholder={user.email} value="" />

                        <div className="profile-page___npt-lbl">Аватар</div>
                        <img className="profile-page___avatar" src={`/assets/img/${user.avatar ? user.avatar : 'no-user-img.png'}`} alt="User Avatar"/>
                        <span
                            className="profile-page___upload-img">Загрузить</span>
                    </div>
                    <div className="profile-page___submit">Сохранить</div>
                </div>
            )
        }
    };
}

export default connect((store, ownProps) => {
    return {
        user: store.users.entities.get(ownProps.id),
        loading: store.system.loading,
        loaded: store.system.loaded
    }
})(ProfileContent);