import React, { Component } from 'react';

class Tracks extends Component{

    state = {playing: false, audio: null, playingPreviewUrl: null};

    playAudio = previewUrl => () => {
        const audio = new Audio(previewUrl);

        if (!this.state.playing){       //if the track is not playing play the clicked track
            this.setState({playing: true, playingPreviewUrl: previewUrl, audio})

            audio.play();
        }
        else {      //if the track is playing
            this.state.audio.pause();

            if(this.state.playingPreviewUrl === previewUrl) {       //current playing track is clicked then pause it
                this.setState({playing: false});
            }
            else {      //track is playing pause the track and play newly clicked track
                this.setState({playingPreviewUrl: previewUrl, audio})

                audio.play();
            }
            
        }
    }

    trackIcon = track => {
        if (!track.preview_url) {
            return <span>N/A</span>;
        }

        if (this.state.playing && this.state.playingPreviewUrl === track.preview_url)
        {
            return <span>| |</span>;
        }

        return <span>&#9654;</span>;
    }

    render(){
        const {tracks} = this.props;

        if (!tracks) return null;

        return (
            <div>
                <h2>Top Tracks</h2>
                    <div>
                        {
                            tracks && tracks.map(track => {
                                const{id, name, album, preview_url} = track;

                                return (
                                    <div key = {id}
                                    onClick = {this.playAudio(preview_url)}
                                    style = {{display: 'inline-block', width: 250, margin: 50, cursor: "pointer"}}>
                                    
                                        <img src = {album.images[0] && album.images[0].url}
                                        alt = 'track-image'
                                        className = 'track-image'/>
                                        
                                    <p>{this.trackIcon(track)} {name}</p>
                                    
                                    </div>
                                );
                            })
                        }
                    </div>
            </div>
        )
    }
}

export default Tracks;