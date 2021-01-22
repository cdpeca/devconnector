import axios from 'axios';
import store from '../store';
import { LOGOUT } from '../actions/types';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
    intercept any error responses from the api
    and check if the token is no longer valid.
    ie. Token has expired or user is no longer
    authenticated.
    logout the user if the token has expired
**/

// ! Only execute in production as it makes development testing incredibly difficult
// TODO Check if this is really getting the correct response status as it seems to logout if you ever close the page

if (process.env.NODE_ENV === 'production') {
    api.interceptors.response.use(
        res => res,
        err => {
            if (err.response.status === 401) {
                store.dispatch({ type: LOGOUT });
            }
            return Promise.reject(err);
        }
    );
}

export default api;
