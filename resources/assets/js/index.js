import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux';
import { createStore, combineReducers } from 'redux';

const store = createStore(
    combineReducers({
        routing
    })
);

const history = syncHistoryWithStore(browserHistory, store);

render(
    <Root store={store} history={history} />,
    document.getElementById('app')
);
