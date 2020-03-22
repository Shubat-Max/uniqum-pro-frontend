import React, { Component } from 'react';
import { connect } from 'react-redux';

import './AddGroupModal.css';
import { addGroup } from "../../../actions";

class AddGroupModal extends Component {
    state = {
        groupName: ''
    };

    render(){
        return (
            <div className="add-group___modal">
                <div className="add-group___block">
                    <div className="add-group___block-header">Создание новой группы</div>
                    <div className="add-group___block-body">
                        <div className="add-group___npt-lbl">Название группы</div>
                        <input
                            className="add-group___npt"
                            type="text" onChange={this.handleInputChange('groupName')}
                        />
                    </div>
                    <div className="add-group___controls">
                        <span className="add-group___submit" onClick={this.handleSubmitClick}>Добавить группу</span>
                        <span className="add-group___cancel" onClick={this.props.closeModal}>Отменить</span>
                    </div>
                </div>
            </div>
        )
    }

    handleInputChange = type => evt => {
        this.setState({
            [type]: evt.target.value
        })
    };

    handleSubmitClick = () => {
        if(this.state.groupName !== '' && this.state.groupName.length >= 3 && this.props.userId !== undefined){
            this.props.addGroup(this.state.groupName, this.props.userId);
        }else{
            alert('error');
        }
    };
}

export default connect(store => {
    return {
        userId: store.system.entities.get(0)._id
    }
},{
    addGroup
})(AddGroupModal);