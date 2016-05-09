import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import RatePicker from './RatePicker';

class JokeDetail extends Component {

    static propTypes = {
        joke: PropTypes.object.isRequired,
        onRateChange: PropTypes.func.isRequired,
        picker: PropTypes.object.isRequired
    };

    render() {
        const { joke, onRateChange, picker } = this.props;

        const rated = joke.rating !== null;

        return (
            <div className="joke-detail">
                <p dangerouslySetInnerHTML={{__html: joke.content}} />
                <RatePicker onChange={onRateChange} defaultValue={joke.rating} picker={picker} rated={rated} />
            </div>
        );
    }

}

export default JokeDetail;