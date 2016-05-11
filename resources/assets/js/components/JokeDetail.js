import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import RatePicker from './RatePicker';
import Prediction from './Prediction';

class JokeDetail extends Component {

    static propTypes = {
        joke: PropTypes.object.isRequired,
        onRateChange: PropTypes.func.isRequired,
        picker: PropTypes.object.isRequired,
        onRateSubmit: PropTypes.func.isRequired,
        prediction: PropTypes.object.isRequired,
        onPredictionSubmit: PropTypes.func.isRequired
    };

    render() {
        const { joke, onRateChange, picker, onRateSubmit, prediction, onPredictionSubmit } = this.props;

        const rated = joke.rating !== null;

        return (
            <div className="joke-detail">
                <p dangerouslySetInnerHTML={{__html: joke.content}} />
                <RatePicker onChange={onRateChange} defaultValue={joke.rating} picker={picker} rated={rated}
                            onSubmit={onRateSubmit} />
                {!rated &&
                    <Prediction prediction={prediction} onSubmit={onPredictionSubmit} />
                }
            </div>
        );
    }

}

export default JokeDetail;