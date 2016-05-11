import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchJoke, changeRating, submitRating, fetchPrediction } from '../actions';
import JokeDetail from '../components/JokeDetail';

class JokePage extends Component {

    constructor(props) {
        super(props);

        this.handleRateChange = this.handleRateChange.bind(this);
        this.handleRateSubmit = this.handleRateSubmit.bind(this);
        this.handlePredictionSubmit = this.handlePredictionSubmit.bind(this);
    }

    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        joke: PropTypes.object.isRequired,
        picker: PropTypes.object.isRequired,
        prediction: PropTypes.object.isRequired
    };

    componentDidMount() {
        const { dispatch, id } = this.props;
        dispatch(fetchJoke(id));
    }

    handleRateChange(rating) {
        this.props.dispatch(changeRating(rating));
    }

    handleRateSubmit(rating) {
        this.props.dispatch(submitRating(this.props.id, rating));
    }

    handlePredictionSubmit() {
        this.props.dispatch(fetchPrediction(this.props.id));
    }

    render() {
        const { id, isFetching, joke, picker, prediction } = this.props;

        return (
            <div className="content">
                <h2>Joke #{id}</h2>

                <article>
                    {isFetching &&
                        <span>Loading...</span>
                    }
                    {!isFetching &&
                        <JokeDetail joke={joke} onRateChange={this.handleRateChange} picker={picker}
                                    onRateSubmit={this.handleRateSubmit} prediction={prediction}
                                    onPredictionSubmit={this.handlePredictionSubmit} />
                    }
                </article>
            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
    const {isFetching, joke, picker, prediction} = state.selectedJoke || {isFetching: true, joke: {},
        picker: {}, prediction: {}};

    return {
        id: ownProps.params.id,
        isFetching,
        joke,
        picker,
        prediction
    };
}

export default connect(mapStateToProps)(JokePage);