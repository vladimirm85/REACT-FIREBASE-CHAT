import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
  } from "react-router-dom"; 
import Nav from '../components/Nav';
import Channel from '../components/Channel';
import Login from '../components/Login';
import { firebase, dataBase } from '../firebase';

const App = () => {
    const user = useUserAuth();

    return (
        user
        ?<div className="App">
            <Router>
                <Nav user={user} />
                <Switch>
                    <Route
                        exact
                        path="/channels/:id"
                        component={props => <Channel user={user} match={props.match}/>} />
                    <Redirect exact from="/" to="/channels/general"/>
                </Switch>
            </Router>
        </div>
        :<Login />
    );
};

const useUserAuth = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        return firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                const user = {
                    displayName: firebaseUser.displayName,
                    photoUrl: firebaseUser.photoURL,
                    id: firebaseUser.uid
                };
                dataBase
                    .collection('users')
                    .doc(user.id)
                    .set(user, { merge: true });
                setUser(user);
            } else setUser(null);
        });
    }, []);

    return user;
};

export default App;