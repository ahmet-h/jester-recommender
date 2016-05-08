import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchJokes } from '../actions';
import JokeList from '../components/JokeList'

class JokeListPage extends Component {

    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        jokes: PropTypes.array.isRequired
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchJokes());
    }

    render() {
        const { isFetching, jokes } = this.props;
        
        return (
            <div className="content">
                <h2>List of All Jokes</h2>

                <article>
                    {isFetching &&
                        <span>Loading...</span>
                    }
                    {!isFetching &&
                        <JokeList jokes={jokes} />
                    }
                </article>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const {isFetching, items} = state.jokes || {isFetching: true, items: []};

    return {
        isFetching,
        jokes: items
    };
}

export default connect(mapStateToProps)(JokeListPage);