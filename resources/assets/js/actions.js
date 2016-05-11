import fetch from 'isomorphic-fetch';

export const JOKES_REQUEST = 'JOKES_REQUEST';
export const JOKES_SUCCESS = 'JOKES_SUCCESS';
export const JOKES_FAILURE = 'JOKES_FAILURE';

export const JOKE_REQUEST = 'JOKE_REQUEST';
export const JOKE_SUCCESS = 'JOKE_SUCCESS';
export const JOKE_FAILURE = 'JOKE_FAILURE';

export const CHANGE_RATING = 'CHANGE_RATING';

export const SUBMIT_RATING_REQUEST = 'SUBMIT_RATING_REQUEST';
export const SUBMIT_RATING_SUCCESS = 'SUBMIT_RATING_SUCCESS';
export const SUBMIT_RATING_FAILURE = 'SUBMIT_RATING_FAILURE';

export const PREDICTION_REQUEST = 'PREDICTION_REQUEST';
export const PREDICTION_SUCCESS = 'PREDICTION_SUCCESS';
export const PREDICTION_FAILURE = 'PREDICTION_FAILURE';

export const TOP_N_REQUEST = 'TOP_N_REQUEST';
export const TOP_N_SUCCESS = 'TOP_N_SUCCESS';
export const TOP_N_FAILURE = 'TOP_N_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestJokes() {
    return {
        type: JOKES_REQUEST
    };
}

function receiveJokes(jokes) {
    return {
        type: JOKES_SUCCESS,
        jokes
    };
}

export function fetchJokes() {
    return dispatch => {
        dispatch(requestJokes());

        return fetch('/api/jokes')
            .then(response => response.json())
            .then(json => dispatch(receiveJokes(json.jokes)));
    };
}

function requestJoke() {
    return {
        type: JOKE_REQUEST
    };
}

function receiveJoke(joke) {
    return {
        type: JOKE_SUCCESS,
        joke
    };
}

export function fetchJoke(id) {
    return dispatch => {
        dispatch(requestJoke());

        return fetch(`/api/joke/${id}`)
            .then(response => response.json())
            .then(json => dispatch(receiveJoke(json.joke)));
    };
}

export function changeRating(rating) {
    return {
        type: CHANGE_RATING,
        rating
    }
}

function requestRatingSubmit(rating) {
    return {
        type: SUBMIT_RATING_REQUEST,
        rating
    };
}

function receiveRatingSubmit(rating) {
    return {
        type: SUBMIT_RATING_SUCCESS,
        rating
    };
}

export function submitRating(jokeId, rating) {
    return dispatch => {
        dispatch(requestRatingSubmit(rating));

        return fetch(`/api/joke/${jokeId}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rating
            })
        })
        .then(response => response.json())
        .then(json => dispatch(receiveRatingSubmit(json.rating)));
    };
}

function requestPrediction(jokeId) {
    return {
        type: PREDICTION_REQUEST,
        jokeId
    };
}

function receivePrediction(prediction) {
    return {
        type: PREDICTION_SUCCESS,
        prediction
    };
}

export function fetchPrediction(jokeId) {
    return dispatch => {
        dispatch(requestPrediction(jokeId));

        return fetch(`/api/predict/${jokeId}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(json => dispatch(receivePrediction(json.prediction)));
    };
}

function requestTopN() {
    return {
        type: TOP_N_REQUEST
    };
}

function receiveTopN(jokes) {
    return {
        type: TOP_N_SUCCESS,
        jokes
    };
}

export function fetchTopN() {
    return dispatch => {
        dispatch(requestTopN());

        return fetch('/api/top-n', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(json => dispatch(receiveTopN(json.jokes)));
    };
}

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        creds
    };
}

function receiveLogin(token, user) {
    return {
        type: LOGIN_SUCCESS,
        token,
        user
    };
}

function failLogin(message) {
    return {
        type: LOGIN_FAILURE,
        message
    };
}

export function loginUser(creds) {
    return dispatch => {
        dispatch(requestLogin(creds));

        return fetch('/api/auth/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(creds)
        })
        .then(response => response.json().then(json => ({json, response})))
        .then(({json, response}) => {
            if(!response.ok) {
                dispatch(failLogin(json.message));
                return Promise.reject(json.message);
            } else {
                localStorage.setItem('token', json.token);
                dispatch(receiveLogin(json.token, json.user));
            }
        }).catch(err => console.log(err));
    };
}
