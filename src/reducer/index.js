import { combineReducers } from 'redux';
import users from './usersReducer';
import channelsMessages from './channelsMessagesReducer';
import authUser from './authUserReducer';
import channels from './channelsReducer'

export default combineReducers({
    authUser,
    users,
    channels,
    channelsMessages
});