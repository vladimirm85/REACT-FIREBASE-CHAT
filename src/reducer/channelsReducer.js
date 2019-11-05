import { GET_CHANNELS } from '../actions';

const initialState = {
    isLoaded: false,
    data: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CHANNELS:
            return {
                isLoaded: true,
                data: [...action.payload.channels]
            };

        default:
            return state;
    };
};