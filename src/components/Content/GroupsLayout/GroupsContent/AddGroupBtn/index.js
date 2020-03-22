import React, { Component } from 'react';

import './AddGroupBtn.css';
import AddGroupModal from '../../../../Modals/AddGroupModal'



class AddGroupBtn extends Component {
    state = {
        showWindowModal: false
    };

    render(){
        return (
            <div className="groups-tools">

                {this.getAddGroupModal()}

                <span
                    className="add-group___btn"
                    onClick={this.handleOpenAddGroupModal}
                >
                    Добавить группу
                </span>
            </div>
        )
    }

    getAddGroupModal = () => {
        if (this.state.showWindowModal) return <AddGroupModal closeModal={this.handleCloseAddGroupModal}/>;
    };


    handleOpenAddGroupModal = () => {
        this.setState({
            showWindowModal: true
        });
    };

    handleCloseAddGroupModal = () => {
        this.setState({
            showWindowModal: false
        });
    }
}

export default AddGroupBtn;