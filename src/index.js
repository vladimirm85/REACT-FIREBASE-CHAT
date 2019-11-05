import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import redusers from './reducer';
import middleware from './middleware';
import './index.css';
import App from './App';

const store = createStore(redusers, middleware);

ReactDOM.render(
    <Provider store={store}>
            <App />
    </Provider>,
    document.getElementById('root'));