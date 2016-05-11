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
        const { isFetching, jokes, message } = this.props;

        return (
            <div className="content">
                <h2>Top 10 Joke Recommendations</h2>

                <article>
                    {isFetching && !message &&
                        <span>Loading...</span>
                    }
                    {!isFetching && !message &&
                        <JokeList jokes={jokes} showRatings={false} />
                    }
                    {message &&
                        <span style={{color: 'red'}}>{message}</span>
                    }
                </article>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const {isFetching, items, message} = state.topN || {isFetching: true, items: [], message: ''};

    return {
        isFetching,
        jokes: items,
        message
    };
}

export default connect(mapStateToProps)(TopNPage);