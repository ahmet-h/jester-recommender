import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import RatePicker from './RatePicker';

class JokeDetail extends Component {

    static propTypes = {
        joke: PropTypes.object.isRequired,
        onRateChange: PropTypes.func.isRequired,
        picker: PropTypes.object.isRequired,
        onRateSubmit: PropTypes.func.isRequired
    };

    render() {
        const { joke, onRateChange, picker, onRateSubmit } = this.props;

        const rated = joke.rating !== null;

        return (
            <div className="joke-detail">
                <p dangerouslySetInnerHTML={{__html: joke.content}} />
                <RatePicker onChange={onRateChange} defaultValue={joke.rating} picker={picker} rated={rated}
                            onSubmit={onRateSubmit} />
            </div>
        );
    }

}

export default JokeDetail;