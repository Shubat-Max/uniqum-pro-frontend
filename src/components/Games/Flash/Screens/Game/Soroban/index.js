import React, {Component} from 'react'
import {v4} from 'uuid'

import './FlashGameScreenSoroban.css'

class Soroban extends Component {
    render(){
        return this.getSoroban(this.props.index);
    }

    getSoroban = (number) => {
        let sorobanEntry = '';

        switch(number){
            case 0: {
                sorobanEntry = (
                    <div className="soroban-jo">
                        <div className="soroban-jo1">
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-zero" />
                        </div>
                        <div className="soroban-jo2">
                            <div className="soroban-bone soroban-zero" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                        </div>
                    </div>
                ); break;
            }
            case 1: {
                sorobanEntry = (
                    <div className="soroban-jo">
                        <div className="soroban-jo1">
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-zero" />
                        </div>
                        <div className="soroban-jo2">
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-zero" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                        </div>
                    </div>
                ); break;
            }
            case 2: {
                sorobanEntry = (
                    <div className="soroban-jo">
                        <div className="soroban-jo1">
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-zero" />
                        </div>
                        <div className="soroban-jo2">
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-zero" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                        </div>
                    </div>
                ); break;
            }
            case 3: {
                sorobanEntry = (
                    <div className="soroban-jo">
                        <div className="soroban-jo1">
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-zero" />
                        </div>
                        <div className="soroban-jo2">
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-zero" />
                            <div className="soroban-bone soroban-one" />
                        </div>
                    </div>
                ); break;
            }
            case 4: {
                sorobanEntry = (
                    <div className="soroban-jo">
                        <div className="soroban-jo1">
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-zero" />
                        </div>
                        <div className="soroban-jo2">
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-zero" />
                        </div>
                    </div>
                ); break;
            }
            case 5: {
                sorobanEntry = (
                    <div className="soroban-jo">
                        <div className="soroban-jo1">
                            <div className="soroban-bone soroban-zero" />
                            <div className="soroban-bone soroban-one" />
                        </div>
                        <div className="soroban-jo2">
                            <div className="soroban-bone soroban-zero" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                        </div>
                    </div>
                ); break;
            }
            case 6: {
                sorobanEntry = (
                    <div className="soroban-jo">
                        <div className="soroban-jo1">
                            <div className="soroban-bone soroban-zero" />
                            <div className="soroban-bone soroban-one" />
                        </div>
                        <div className="soroban-jo2">
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-zero" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                        </div>
                    </div>
                ); break;
            }
            case 7: {
                sorobanEntry = (
                    <div className="soroban-jo">
                        <div className="soroban-jo1">
                            <div className="soroban-bone soroban-zero" />
                            <div className="soroban-bone soroban-one" />
                        </div>
                        <div className="soroban-jo2">
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-zero" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                        </div>
                    </div>
                ); break;
            }
            case 8: {
                sorobanEntry = (
                    <div className="soroban-jo">
                        <div className="soroban-jo1">
                            <div className="soroban-bone soroban-zero" />
                            <div className="soroban-bone soroban-one" />
                        </div>
                        <div className="soroban-jo2">
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-zero" />
                            <div className="soroban-bone soroban-one" />
                        </div>
                    </div>
                ); break;
            }
            case 9: {
                sorobanEntry = (
                    <div className="soroban-jo">
                        <div className="soroban-jo1">
                            <div className="soroban-bone soroban-zero" />
                            <div className="soroban-bone soroban-one" />
                        </div>
                        <div className="soroban-jo2">
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-one" />
                            <div className="soroban-bone soroban-zero" />
                        </div>
                    </div>
                ); break;
            }
            default: return null;
        }


        return (
            <div className="soroban-content-block" key={v4()}>
                <div className="soroban-rail" />
                {sorobanEntry}
            </div>
        );
    };

}

export default Soroban;