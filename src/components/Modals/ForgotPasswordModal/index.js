import React, { Component } from 'react';

import './ForgotPasswordModal.css';

class ForgotPasswordModal extends Component {
    state = {
        mailSent: false
    };

    render(){
        return (
            <div className="modal-wrapper">
                <div className="modal-fp" >
                    <div className="modal-fp-header">
                        <span>Восстановление доступа</span>
                        <span className="modal-fp-close" onClick={this.props.onClose}>X</span>
                    </div>
                    <div className="modal-fp-body">
                        {this.getBody()}
                    </div>
                </div>
            </div>
        )
    }

    getBody = () => {
        if(!this.state.mailSent){
            return (
                <div>
                    <div className="modal-fp-text">
                        Пожалуйста, укажите email или логин, который Вы использовали для входа на сайт.
                    </div>
                    <input type="text" className="modal-fp-npt" placeholder="Email"/>
                    <div className="modal-fp-btn" onClick={this.handlerOnClick_Button}>Далее</div>
                </div>
            );
        }else{
            return (
                <div>
                    <div className="modal-fp-text">
                        На указанную почту выслано письмо с инструкциями по восстановлению доступа к сайту.
                    </div>
                </div>
            );
        }
    };

    handlerOnClick_Button = () => {
        this.setState({
            mailSent: true
        });
    }
}

export default ForgotPasswordModal;