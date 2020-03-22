import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



class ConfirmationPage extends Component {

    state = {
        stage: 1
    };

    componentDidMount(){
        document.title = "Uniqum | Подтверждение";

        // axios.get(`${APIUrl}/users/confirm/${this.props.id}`)
        console.log(this.props.id);
        axios.post(`/api/users/confirm/${this.props.id}`)
            .then(response => {
                console.log(response);
                this.setState({stage: 2});
            })
            .catch(error => {
                this.setState({stage: 3});
            });
    }

    render(){
        switch(this.state.stage){
            case 1:
                return (
                    <div>Загрузка</div>
                );
            case 2:
                return (
                    <div>
                        <div>Электронная почта успешно подтверждена</div>
                        <div><Link to='/login'>Перейдите на страницу авторизации</Link></div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <div>Ошибка при подтверждении электронной почты</div>
                    </div>
                );
            default:
                return (
                    <div>Загрузка</div>
                );
        }

        // const {id} = this.props;

        //send data to server, listen for response
        // if found and updated -> go to login page
        // no - display confirmation error
        // return ( <div>{this.props.mail}</div> )
    }
}

export default ConfirmationPage;