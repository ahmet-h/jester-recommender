import React, { Component, PropTypes } from 'react';

class Prediction extends Component {

    static propTypes = {
        prediction: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    render() {
        const { prediction, onSubmit } = this.props;

        const { isFetching, value } = prediction;

        const predicted = value !== null;

        return (
            <div className="joke-predict">
                {(!isFetching && !predicted) &&
                    <button className="submit-btn" onClick={e => onSubmit()}>Get Prediction</button>
                }
                {isFetching &&
                    <span>Calculating...</span>
                }
                {predicted &&
                    <span>Predicted rating: {value}</span>
                }
            </div>
        );
    }

}

export default Prediction;