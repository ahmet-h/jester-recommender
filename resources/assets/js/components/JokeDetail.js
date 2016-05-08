import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class JokeDetail extends Component {

    static propTypes = {
        joke: PropTypes.object.isRequired
    };

    render() {
        const { joke } = this.props;

        return (
            <div className="joke-detail">
                <p dangerouslySetInnerHTML={{__html: joke.content}} />
            </div>
        );
    }

}

export default JokeDetail;