import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchJoke, changeRating } from '../actions';
import JokeDetail from '../components/JokeDetail';

class JokePage extends Component {

    constructor(props) {
        super(props);

        this.handleRateChange = this.handleRateChange.bind(this);
    }

    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        joke: PropTypes.object.isRequired,
        picker: PropTypes.object.isRequired
    };

    componentDidMount() {
        const { dispatch, id } = this.props;
        dispatch(fetchJoke(id));
    }

    handleRateChange(rating) {
        this.props.dispatch(changeRating(rating));
    }

    render() {
        const { id, isFetching, joke, picker } = this.props;

        return (
            <div className="content">
                <h2>Joke #{id}</h2>

                <article>
                    {isFetching &&
                        <span>Loading...</span>
                    }
                    {!isFetching &&
                        <JokeDetail joke={joke} onRateChange={this.handleRateChange} picker={picker} />
                    }
                </article>
            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
    const {isFetching, joke, picker} = state.selectedJoke || {isFetching: true, joke: {}, picker: {}};

    return {
        id: ownProps.params.id,
        isFetching,
        joke,
        picker
    };
}

export default connect(mapStateToProps)(JokePage);