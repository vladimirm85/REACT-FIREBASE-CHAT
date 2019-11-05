import { GET_AUTH_USER } from '../actions';

const initialState = {
    isLoaded: false,
    data: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_AUTH_USER:
            return {
                isLoaded: true,
                data: {...action.payload.authUser}
            }

        default:
            return state;
    };
};