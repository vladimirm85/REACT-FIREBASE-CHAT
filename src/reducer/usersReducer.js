import { GET_USERS } from '../actions';

const initialState = {
    isLoaded: false,
    data: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                isLoaded: true,
                data: [...action.payload.users]
            };

        default:
            return state;
    };
};