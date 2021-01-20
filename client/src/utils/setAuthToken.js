import axios from 'axios';

// ! Should not use reducers to manage local localStorage
// TODO Fix this using this update: https://github.com/bradtraversy/devconnector_2.0#redux-subscription-to-manage-local-storage-

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

export default setAuthToken;
