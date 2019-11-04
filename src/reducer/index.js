import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import users from './usersReducer';
import messages from './messagesReducer';

export default combineReducers({
    users,
    messages,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});