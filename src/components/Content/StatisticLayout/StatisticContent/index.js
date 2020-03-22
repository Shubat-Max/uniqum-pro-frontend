import React, { Component } from 'react';

import './StatisticContent.css';
import '../../common.css';



class StatisticContent extends Component {
    render(){
        document.title = 'Uniqum Platform - Статистика';
        return (
            <div className="main-block">
                <div className="main-block-body">
                    Statistic Content
                </div>
            </div>
        )
    }
}

export default StatisticContent;