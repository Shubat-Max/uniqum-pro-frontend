import React, { Component } from 'react';

import './LoaderBlankContent.css';
import '../../common.css';
import Loader from "../../../Loader";



class HelpContent extends Component {
    render(){
        return (
            <div className="main-block">
                <Loader />
            </div>
        )
    }
}



export default HelpContent;