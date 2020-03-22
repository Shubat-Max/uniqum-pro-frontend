import React, {Component} from 'react';

class AudioPlayer extends Component {
    state = {
        currentPlaying: null
    };

    //what to play
    //loop?

    render(){
        return this.getSound()
    }

    getSound = () => {
        console.log('start playing audio');


        if(this.state.currentPlaying){
            this.state.currentPlaying.loop = true;
            this.state.currentPlaying.volume = 0.2;
            this.state.currentPlaying.play();
        }else{
            let audio = new Audio('/assets/sounds/water-drops-daniel_simon.mp3');
            this.setState({
                currentPlaying: audio
            });
        }

        return null;
    }
}

export default AudioPlayer;