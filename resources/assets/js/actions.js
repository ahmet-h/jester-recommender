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

function receiveRatingSubmit() {
    return {
        type: SUBMIT_RATING_SUCCESS
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
        .then(json => dispatch(receiveRatingSubmit()));
    };
}