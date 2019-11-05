import { GET_CHANNEL_MESSAGES } from '../actions'

export default (state = {}, action) => {
    switch (action.type) {
        case GET_CHANNEL_MESSAGES:
            return {
                ...state,
                [action.payload.channelId] : [...action.payload.messages]
            };
        
        default:
            return state;
    };
};