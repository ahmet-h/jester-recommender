import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchJoke } from '../actions';
import JokeDetail from '../components/JokeDetail';

class JokePage extends Component {

    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        joke: PropTypes.object.isRequired
    };

    componentDidMount() {
        const { dispatch, id } = this.props;
        dispatch(fetchJoke(id));
    }

    render() {
        const { isFetching, joke } = this.props;

        return (
            <div className="content">
                <h2>Joke Detail</h2>

                <article>
                    {isFetching &&
                        <span>Loading...</span>
                    }
                    {!isFetching &&
                        <JokeDetail joke={joke} />
                    }
                </article>
            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
    const {isFetching, joke} = state.selectedJoke || {isFetching: true, joke: {}};

    return {
        id: ownProps.params.id,
        isFetching,
        joke
    };
}

export default connect(mapStateToProps)(JokePage);