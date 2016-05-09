import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux';
import {
    JOKES_REQUEST,
    JOKES_SUCCESS,
    JOKE_REQUEST,
    JOKE_SUCCESS,
    CHANGE_RATING
} from './actions';

function selectedJoke(state = {
    isFetching: false,
    picker: {moved: false},
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
                picker: {moved: false, value: (action.joke.rating ? action.joke.rating : 0)},
                joke: action.joke
            });
        case CHANGE_RATING:
            return Object.assign({}, state, {
                picker: Object.assign({}, state.picker, {
                    moved: true,
                    value: action.rating
                })
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