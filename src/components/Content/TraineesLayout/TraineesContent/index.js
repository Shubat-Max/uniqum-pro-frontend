import React, { Component } from 'react';
// import axios from 'axios';

import './TraineesContent.css';
import '../../common.css';
import TraineesList from './TraineesList';
import TraineesListTools from './TraineesListTools';



class TraineesContent extends Component {
    render(){
        document.title = 'Uniqum Platform | Ученики'
        return (
            <div className="main-block">
                <div className="main-block-body">
                    <TraineesListTools/>
                    <TraineesList/>
                </div>
            </div>
        )
    }
}

export default TraineesContent;