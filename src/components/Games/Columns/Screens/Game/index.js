import React, { Component } from 'react';


class ColumnsScreenGame extends Component {
    render(){
        return this.getBody();
    }

    getBody = () => {
        return (
            <div className="columns-game">

                {/*{this.pushRedirect()}*/}

                <div className="choice-wrapper">
                    <div className="choice-question">Вы уверены?</div>
                    <div className="choices">
                        <span
                            className="choice-yes"
                            onClick={() => this.handleRedirectButtons('/')}
                        >Да</span>
                        <span
                            className="choice-no"
                            onClick={() => this.handleScreenChange(0)}
                        >Нет</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default ColumnsScreenGame;
