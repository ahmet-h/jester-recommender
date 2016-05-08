import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux';
import {
    JOKES_REQUEST,
    JOKES_SUCCESS,
    JOKE_REQUEST,
    JOKE_SUCCESS
} from './actions';

function selectedJoke(state = {
    isFetching: false,
    joke: {}
}, action) {
    switch (action.type) {
        case JOKE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case JOKE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                joke: action.joke
            });
        default:
            return state;
    }
}

function jokes(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case JOKES_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case JOKES_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.jokes
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    selectedJoke,
    jokes,
    routing
});

export default rootReducer;