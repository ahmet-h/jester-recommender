import React, { Component } from 'react';

class JokeRate extends Component {

    render() {
        return (
            <div className="joke-rate">
                <div style={{marginBottom: '4px', textAlign: 'center'}}>
                    <span>Your Rating: </span>
                    <span>-</span>
                </div>
                <input type="range" min="-10" max="10" step="0.1" defaultValue="0" />
            </div>
        );
    }

}

export default JokeRate;