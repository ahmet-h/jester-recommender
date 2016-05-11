import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import { push } from 'react-router-redux';

class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        user: PropTypes.object
    };

    componentDidMount() {
        const { dispatch } = this.props;

        let token = localStorage.getItem('token') || null;

        if(token) {
            dispatch(push('/'));
        }
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch, isAuthenticated } = nextProps;

        if(isAuthenticated) {
            dispatch(push('/'));
        }
    }

    handleLoginSubmit(e) {
        e.preventDefault();

        const { dispatch } = this.props;

        const email = this.refs.email.value.trim();
        const password = this.refs.password.value.trim();

        const creds = {
            email,
            password
        };

        dispatch(loginUser(creds));
    }

    render() {
        const { isFetching, isAuthenticated, user, message } = this.props;

        return (
            <div className="wrapper">
                <div className="login-container">
                    <form onSubmit={this.handleLoginSubmit}>
                        <div>
                            <h3>Jester Joke Recommender</h3>
                        </div>
                        <div>
                            <label>E-mail:</label>
                            <input ref="email" type="text" placeholder="E-mail" />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input ref="password" type="password" placeholder="Password" />
                        </div>
                        <div>
                            {message &&
                            <span style={{color: 'red'}}>{message}</span>
                            }
                            <button type="submit" className="" style={{float: 'right'}}
                                    disabled={isFetching}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const {isFetching, isAuthenticated, user, message} = state.auth || {isFetching: false, isAuthenticated: false,
        user: {}, message: ''};

    return {
        isFetching,
        isAuthenticated,
        user,
        message
    };
}

export default connect(mapStateToProps)(LoginPage);