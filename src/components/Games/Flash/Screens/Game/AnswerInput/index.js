import React, { Component } from 'react';

import './AnswerInput.css';

class AnswerInput extends Component {
    constructor(props){
        super(props);
        this.focusCatcher = React.createRef();
    }

    state = {
        answerInput: ''
    };

    componentDidMount(){
        if(!this.props.disabled){
            this.focusCatcher.current.focus();
        }
    }

    componentDidUpdate(){
        if(!this.props.disabled){
            this.focusCatcher.current.focus();
        }
    }

    render(){
        return (
            <div className="soroban-ai-wrapper">
                <input
                    type="text"
                    ref={this.focusCatcher}
                    pattern="[0-9]*"
                    value={this.state.answerInput}
                    onChange={this.handleOnChange}
                    onKeyDown={this.handleOnKeyDown}
                    disabled={this.props.disabled}
                    className='soroban-ai-input'
                />
                <div
                    className="soroban-ai-button"
                    onClick={() => this.submitAnswer(this.state.answerInput)}
                >></div>
            </div>
        )
    }

    handleOnKeyDown = (evt) => {
        if(evt.key === 'Enter'){
            this.submitAnswer(this.state.answerInput);
        }
    };

    handleOnChange = (evt) => {
        this.setState({
            answerInput: evt.target.validity.valid ? evt.target.value : this.state.answerInput
        })
    };

    submitAnswer = (answer) => {
        this.setState({
            answerInput: ''
        });
        if(this.props.handler){
            this.props.handler(answer);
        }
    }
}

export default AnswerInput;