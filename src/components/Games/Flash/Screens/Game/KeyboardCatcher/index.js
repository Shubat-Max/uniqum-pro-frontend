import React, { Component } from 'react';

class KeyboardCatcher extends Component {
    constructor(props){
        super(props);
        this.focusCatcher = React.createRef();
    }

    componentDidMount(){

        this.focusCatcher.current.focus();

    }

    render(){

        return <input
            type="text"
            value={``}
            ref={this.focusCatcher}
            onKeyDown={this.handleKey}
            onBlur={this.keepFocused}
            style={{
                position: 'absolute',
                top: '0',
                left: '0',
                height: '0px',
                width: '0px',
                zIndex: '-1',
                opacity: '0'
            }}
        />
    }

    handleKey = (evt) => {
        if(evt.key === 'Enter'){
            console.log('Enter pressed');
            if(this.props.handler){
                this.props.handler();
            }
        }
    };

    keepFocused = () => {

        this.focusCatcher.current.focus();

    };
}

export default KeyboardCatcher;