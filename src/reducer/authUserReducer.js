import { GET_AUTH_USER, AUTH_USER_LOG_OUT } from '../actions';

const initialState = {
    isLoaded: false,
    data: {
        channels: {}
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_AUTH_USER:
            return {
                isLoaded: true,
                data: { ...action.payload.authUser }
            };

        case AUTH_USER_LOG_OUT:
            return {
                isLoaded: false,
                data: {}
            };

        default:
            return state;
    };
};