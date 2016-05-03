import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import App from './App';
import NotFound from '../components/NotFound';

class Root extends Component {

    static propTypes = {
        store: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        const { store, history } = this.props;

        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={App}>
                        
                    </Route>
                    <Route path="*" component={NotFound} />
                </Router>
            </Provider>
        )
    }

}

export default Root;