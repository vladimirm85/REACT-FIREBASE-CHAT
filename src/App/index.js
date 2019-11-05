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
import { handleGetAuthUser } from '../actions';

const App = ({authUser}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleGetAuthUser());
    }, [dispatch]);

    return (
        authUser.isLoaded
        ?<div className="App">
            <Router>
                <Navigation authUser={authUser.data} />
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

App.propTypes = {
    authUser: PropTypes.object
};

const mapStateToProps = state => ({
    authUser: state.authUser
});

export default connect(mapStateToProps)(App);