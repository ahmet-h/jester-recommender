import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import JokeList from '../components/JokeList';
import { fetchTopN } from '../actions';

class TopNPage extends Component {

    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        jokes: PropTypes.array.isRequired
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchTopN());
    }

    render() {
        const { isFetching, jokes } = this.props;

        return (
            <div className="content">
                <h2>Top 10 Joke Recommendations</h2>

                <article>
                    {isFetching &&
                        <span>Loading...</span>
                    }
                    {!isFetching &&
                        <JokeList jokes={jokes} showRatings={false} />
                    }
                </article>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const {isFetching, items} = state.topN || {isFetching: true, items: []};

    return {
        isFetching,
        jokes: items
    };
}

export default connect(mapStateToProps)(TopNPage);