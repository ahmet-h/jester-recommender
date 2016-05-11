import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class App extends Component {

    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired
    };

    componentWillMount() {
        this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
        this.checkAuth();
    }

    checkAuth() {
        const { dispatch, isAuthenticated } = this.props;

        if(!isAuthenticated) {
            dispatch(push('/login'));
        }
    }

    render() {
        const { user, children } = this.props;

        return (
            <div className="wrapper">
                <header>
                    <div className="container">
                        <div className="title">
                            <span>Jester Joke Recommender</span>
                        </div>
                        <nav>
                            <ul>
                                <li>
                                    <IndexLink to="/" activeClassName="active">Home</IndexLink>
                                </li>
                                <li>
                                    <Link to="/jokes" activeClassName="active">Joke List</Link>
                                </li>
                                <li>
                                    <Link to="/top-n" activeClassName="active">Top 10 Recommendations</Link>
                                </li>
                            </ul>
                            <div className="user-nav">
                                <span>{user.email}</span>
                                <span><a href="#">Log Out</a></span>
                            </div>
                            <div className="clear"></div>
                        </nav>
                    </div>
                </header>
                <div className="main">
                    <div className="container">
                        {children}
                    </div>
                </div>
                <footer>
                    <div className="container">
                        <span>Jester Joke Recommender</span>
                    </div>
                </footer>
            </div>
        );
    }
    
}

function mapStateToProps(state) {
    const {isFetching, isAuthenticated, user} = state.auth || {isFetching: false, isAuthenticated: false, user: {}};

    return {
        isFetching,
        isAuthenticated,
        user
    };
}

export default connect(mapStateToProps)(App);
