import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './SideWidgetPanel.css';

class SideWidgetPanel extends Component {
    render(){
        return (
            <div className="side-widget-panel">
                <Link to="/game/flash">Флеш</Link>
                <Link to="/game/columns">Столбцы</Link>
                <Link to="/game/uniqum">Уникум</Link>
            </div>
        )
    }
}

export default SideWidgetPanel;