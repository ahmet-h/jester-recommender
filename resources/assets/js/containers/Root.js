import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import App from './App';
import HomePage from './HomePage';
import JokeListPage from './JokeListPage';
import JokePage from './JokePage';
import TopNPage from './TopNPage';
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
                        <IndexRoute component={HomePage} />
                        <Route path="jokes" component={JokeListPage} />
                        <Route path="joke/:id" component={JokePage} />
                        <Route path="top-n" component={TopNPage} />
                    </Route>
                    <Route path="*" component={NotFound} />
                </Router>
            </Provider>
        )
    }

}

export default Root;