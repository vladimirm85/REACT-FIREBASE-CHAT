import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance, reduxFirestore } from 'redux-firestore';
import { firebase } from './firebase'
import redusers from './reducer';
import middleware from './middleware';
import './index.css';
import App from './App';

const store = createStore(redusers, compose(
    middleware,
    reduxFirestore(firebase)
));

const rrfConfig = {
    userProfile: 'users'
};

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};


ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root'));