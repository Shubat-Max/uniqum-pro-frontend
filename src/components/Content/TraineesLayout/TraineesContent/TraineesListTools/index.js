import React, { Component } from 'react';

import './TraineesListTools.css';
import AddUserModal from '../../../../Modals/AddUserModal'


class TraineesListTools extends Component {
    state = {
        showModalWindow: false
    };

    render(){
        return (
            <div className="trainee-list-tools">

                {this.getModalWindow()}

                <span
                    className="add-trainee___btn"
                    onClick={this.handleOpenModalWindow}
                >
                    Пригласить ученика
                </span>
            </div>
        )
    }

    getModalWindow = () => {
        if (this.state.showModalWindow) return <AddUserModal closeModal={this.handleCloseModalWindow}/>;
    };

    handleOpenModalWindow = () => {
        this.setState({
            showModalWindow: true
        });
    };

    handleCloseModalWindow = () => {
        this.setState({
            showModalWindow: false
        });
    }
}

export default TraineesListTools;