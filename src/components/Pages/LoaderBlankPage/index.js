import React, { Component } from 'react';

import NavBar from '../../NavBar';
import LoaderBlankLayout from '../../Content/LoaderBlankLayout';
import Footer from '../../Footer';
import './LoaderBlankPage.css';
import Cookies from "universal-cookie";
import {systemStartup} from "../../../actions";
import {connect} from "react-redux";

class LoaderBlankPage extends Component {

    componentDidMount(){
        document.title = "Uniqum | Что-то пошло не так";
    }

    render(){
        return this.userCheck();
    }

    userCheck = () => {
        const cookies = new Cookies();
        const UID = cookies.get('UID');
        const URID = cookies.get('URID');
        if(UID === undefined || URID === undefined){
            this.props.history.push('/login');
            return null;
        }else{
            this.props.systemStartup(UID, URID);
            return this.getPage();
        }
    };

    getPage = () => {
        return (
            <div className='wrapper'>
                <NavBar />
                <LoaderBlankLayout />
                <Footer />
            </div>
        )
    };
}

export default connect(null,{
    systemStartup
})(LoaderBlankPage);