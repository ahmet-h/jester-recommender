import fetch from 'isomorphic-fetch';

export const JOKES_REQUEST = 'JOKES_REQUEST';
export const JOKES_SUCCESS = 'JOKES_SUCCESS';
export const JOKES_FAILURE = 'JOKES_FAILURE';

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