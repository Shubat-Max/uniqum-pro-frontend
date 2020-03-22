import React, { Component } from 'react';
import {v4} from 'uuid';

import './Footer.css';
import {connect} from "react-redux";

class Footer extends Component {
    state = {
        items: [
            "главная",
            "группы",
            "ученики",
            "статистика",
            "рейтинг",
            "помощь"
        ]
    };


    render(){

        let pref = !this.props.activeUserRole ? 'b_' : this.props.activeUserRole === '3' ? 'o_' : 'b_';

        return (
            <div className={pref + 'footer-wrapper'}>
                <div className="footer-offset-1" />
                <div className={pref + 'footer-nav'}>
                    {/*{this.getNavBody()}*/}
                </div>
                <div className={pref + 'footer-copy'}>
                    Crystal Sight &copy; 2018
                </div>
                <div className={pref + 'footer-media'}>
                    <a href="">Youtube</a>
                    <a href="">Вконтакте</a>
                    <a href="">Twitter</a>
                    <a href="">Instagram</a>
                </div>
                <div className="footer-offset-1" />
            </div>
        )
    }

    getNavBody = () => {
        return this.state.items.map(item => {
            return (
                <a href="" className="footer-nav-item" key={v4()}>{item}</a>
            )
        })
    }
}

// export default connect(store => {
//     return {
//         activeUserRole: store.system.entities.get(0).role
//     }
// })(Footer);

export default Footer;