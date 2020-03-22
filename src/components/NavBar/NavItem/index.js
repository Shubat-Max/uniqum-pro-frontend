import React, { Component } from 'react';
import {Link} from "react-router-dom";

import './NavItem.css';

class NavItem extends Component {
    render(){
        return (
            <Link to={`/${this.props.path}`}>
                <div className="nav-item">
                    {this.props.title}
                </div>
            </ Link>

        )
    }
}

export default NavItem;