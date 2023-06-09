import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux';
import {
    JOKES_REQUEST,
    JOKES_SUCCESS,
    JOKES_FAILURE,

    JOKE_REQUEST,
    JOKE_SUCCESS,
    JOKE_FAILURE,

    CHANGE_RATING,

    SUBMIT_RATING_REQUEST,
    SUBMIT_RATING_SUCCESS,
    SUBMIT_RATING_FAILURE,

    PREDICTION_REQUEST,
    PREDICTION_SUCCESS,
    PREDICTION_FAILURE,

    TOP_N_REQUEST,
    TOP_N_SUCCESS,
    TOP_N_FAILURE,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from './actions';

function selectedJoke(state = {
    isFetching: false,
    picker: {moved: false, isSaving: false, saved: false},
    joke: {},
    prediction: {isFetching: false, value: null}
}, action) {
    switch (action.type) {
        case JOKE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case JOKE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                picker: Object.assign({}, state.picker, {
                    moved: false,
                    value: (action.joke.rating ? action.joke.rating : 0),
                    saved: false
                }),
                joke: action.joke,
                prediction: {isFetching: false, value: null}
            });
        case CHANGE_RATING:
            return Object.assign({}, state, {
                picker: Object.assign({}, state.picker, {
                    moved: true,
                    value: action.rating
                })
            });
        case SUBMIT_RATING_REQUEST:
            return Object.assign({}, state, {
                picker: Object.assign({}, state.picker, {
                    isSaving: true
                })
            });
        case SUBMIT_RATING_SUCCESS:
            return Object.assign({}, state, {
                picker: Object.assign({}, state.picker, {
                    isSaving: false,
                    value: action.rating,
                    saved: true
                }),
                joke: Object.assign({}, state.joke, {
                    rating: action.rating
                })
            });
        case PREDICTION_REQUEST:
            return Object.assign({}, state, {
                prediction: Object.assign({}, state.prediction, {
                    isFetching: true,
                    message: null
                })
            });
        case PREDICTION_SUCCESS:
            return Object.assign({}, state, {
                prediction: Object.assign({}, state.prediction, {
                    isFetching: false,
                    value: action.prediction.toFixed(2)
                })
            });
        case PREDICTION_FAILURE:
            return Object.assign({}, state, {
                prediction: Object.assign({}, state.prediction, {
                    isFetching: false,
                    message: action.message
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

function topN(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case TOP_N_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                message: null
            });
        case TOP_N_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.jokes
            });
        case TOP_N_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                message: action.message
            });
        default:
            return state;
    }
}

function auth(state = {
    isFetching: false,
    isAuthenticated: false,
    user: {}
}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                user: action.user
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                message: action.message
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    selectedJoke,
    jokes,
    topN,
    auth,
    routing
});

export default rootReducer;