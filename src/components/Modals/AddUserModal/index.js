import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generate } from 'generate-password';

import './AddUserModal.css';
import {createUser} from "../../../actions";

class AddUserModal extends Component {
    state = {
        name: '',
        email: '',

        nameEmptyError: false,
        nameGtError: false,
        nameLtError: false,

        emailEmptyError: false,

        invitationSent: false,
        invitationNotSent: false
    };

    render(){
        return (
            <div className="add-user___modal">
                <div className="add-user___block">
                    <div className="add-user___block-header">Приглашение нового ученика</div>
                    <div className="add-user___block-body">

                        {this.getNotification()}

                        <div className="add-user___npt-block">
                            <div className="add-user___npt-lbl">Имя, Фамилия</div>
                            <input
                                className="add-user___npt"
                                type="text" onChange={this.handleInputChange('name')}
                                value={this.state.name}
                            />
                            {this.getNameError()}
                        </div>


                        <div className="add-user___npt-block">
                            <div className="add-user___npt-lbl">Электронная почта</div>
                            <input
                                className="add-user___npt"
                                type="email" onChange={this.handleInputChange('email')}
                                value={this.state.email}
                            />
                            {this.getEmailError()}
                        </div>


                        <div className="add-user___npt-block">
                            <div className="add-user___npt-lbl">* Пароль будет сгенерирован автоматически.</div>
                        </div>



                    </div>
                    <div className="add-user___controls">
                        <span className="add-user___submit" onClick={this.handleSubmitClick}>Пригласить</span>
                        <span className="add-user___cancel" onClick={this.props.closeModal}>Отменить</span>
                    </div>
                </div>
            </div>
        )
    }

    handleInputChange = type => evt => {
        this.setState({
            [type]: evt.target.value
        });
    };

    handleCheckboxChange = type => {
        this.setState({
            [type]: !this.state[type]
        })
    };

    // getMessage = () => {
    //     if(this.state.invitationSent){
    //         setTimeout(function(){
    //             this.setState({
    //                 invitationSent: false
    //             })
    //         }.bind(this), 5000);
    //
    //         return (
    //             <div className="add-user___notification">
    //                 Приглашение было успешно выслано
    //             </div>
    //         )
    //     }else{
    //         return null;
    //     }
    // };

    getNotification = () => {
        if(this.state.invitationSent){
            setTimeout(function(){
                this.setState({
                    invitationSent: false
                })
            }.bind(this), 5000);

            return (
                <div className="add-user___notification-green">
                    Приглашение было успешно выслано
                </div>
            )
        }else if(this.state.invitationNotSent){
            return (
                <div className="add-user___notification-red">
                    Приглашение не было выслано, перепроверьте данные
                </div>
            )
        }else{
            return null;
        }
    };

    handleSubmitClick = () => {
        let data = {};
        let sendInvitation = true;

        if(this.state.name === ''){
            if(sendInvitation) sendInvitation = false;

            this.setState({
                nameEmptyError: true,
                nameGtError: false,
                nameLtError: false
            })
        }else if(this.state.name.length < limits.name.gt){
            if(sendInvitation) sendInvitation = false;

            this.setState({
                nameEmptyError: false,
                nameGtError: true,
                nameLtError: false
            })
        }else if(this.state.name.length > limits.name.lt){
            if(sendInvitation) sendInvitation = false;

            this.setState({
                nameEmptyError: false,
                nameGtError: false,
                nameLtError: true
            })
        }else{
            data.name = this.state.name;
            this.setState({
                nameEmptyError: false,
                nameGtError: false,
                nameLtError: false
            })
        }


        if(this.state.email === ''){
            if(sendInvitation) sendInvitation = false;

            this.setState({
                emailEmptyError: true
            })
        }else{
            data.email = this.state.email;
            this.setState({
                emailEmptyError: false
            })
        }

        // Other options that has to be passed to backend

        data.role = 3;
        data.pwd = generate({
            length: 10,
            numbers: true
        });
        data.invitedBy = this.props.userId;

        if(sendInvitation){
            this.props.createUser(data);
            // Display if creation of user is successful or not
            this.sentSuccessful();
            // this.props.closeModal();
        }else{
            this.sentInterrupted();
        }
    };

    sentSuccessful = () => {
        this.setState({
            name: '',
            email: '',
            invitationSent: true
        })
    };

    sentInterrupted = () => {
        this.setState({
            invitationNotSent: true
        })
    };

    getNameError = () => {
        if(this.state.nameEmptyError){
            return <div>Необходимо заполнить поле</div>
        }else if(this.state.nameGtError){
            return <div>Имя слишком короткое</div>
        }else if(this.state.nameLtError){
            return <div>Имя слишком длинное</div>
        }
    };

    getEmailError = () => {
        if(this.state.emailEmptyError){
            return <div>Необходимо заполнить поле</div>
        }
    };
}

const limits = {
    name: {
        gt: 4,
        lt: 30
    },
    pwd: {
        gt: 7,
        lt: 20
    }
};

export default connect(store => {
    return {
        userId: store.system.entities.get(0)._id
    }
},{
    createUser
})(AddUserModal);