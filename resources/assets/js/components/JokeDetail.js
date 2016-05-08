import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import JokeRate from './JokeRate';

class JokeDetail extends Component {

    static propTypes = {
        joke: PropTypes.object.isRequired
    };

    render() {
        const { joke } = this.props;

        return (
            <div className="joke-detail">
                <p dangerouslySetInnerHTML={{__html: joke.content}} />
                <JokeRate />
            </div>
        );
    }

}

export default JokeDetail;