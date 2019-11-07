import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom"; 
import PropTypes from 'prop-types';
import Navigation from '../components/Navigation';
import Channel from '../components/Channel';
import Login from '../components/Login';
import {
    handleGetAuthUser,
    handleGetUsers,
    handleGetChannels
} from '../actions';

const App = ({authUser, users, channels}) => {
    useFetchData()
    
    return (
        !(users.isLoaded && channels.isLoaded)
        ?<div className="ChatStartScreen"><h1>REACT-FIREBASE-CHAT</h1></div>
        :authUser.isLoaded
        ?<div className="App">
            <Router>
                <Navigation />
                <Switch>
                    <Route
                        exact
                        path="/channels/:id"
                        component={props =>
                            <Channel
                                match={props.match} />} />
                    <Redirect exact from="/" to="/channels/general"/>
                </Switch>
            </Router>
        </div>
        :<Login />
    );
};

const useFetchData = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleGetAuthUser());
        dispatch(handleGetUsers());
        dispatch(handleGetChannels());
    }, [dispatch]);
};

App.defaultProps = {
    authUser: {},
    users: {},
    channels: {}
};

App.propTypes = {
    authUser: PropTypes.object,
    users: PropTypes.object,
    channels: PropTypes.object
};

const mapStateToProps = state => ({
    authUser: state.authUser,
    users: state.users,
    channels: state.channels,
});

export default connect(mapStateToProps)(App);