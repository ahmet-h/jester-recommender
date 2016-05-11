import React, { Component, PropTypes } from 'react';

class Prediction extends Component {

    static propTypes = {
        prediction: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    render() {
        const { prediction, onSubmit } = this.props;

        const { isFetching, value, message } = prediction;

        const predicted = value !== null;

        return (
            <div className="joke-predict">
                {(!isFetching && !predicted && !message) &&
                    <button className="submit-btn" onClick={e => onSubmit()}>Get Prediction</button>
                }
                {isFetching && !message &&
                    <span>Calculating...</span>
                }
                {predicted && !message &&
                    <span>Predicted rating: {value}</span>
                }
                {message &&
                    <span style={{color: 'red'}}>{message}</span>
                }
            </div>
        );
    }

}

export default Prediction;