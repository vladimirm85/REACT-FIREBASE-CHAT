import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import Channel from '../components/Channel';
import Login from '../components/Login';
import { firebase, dataBase } from '../firebase';

const App = () => {
    const user = useUserAuth();

    return (
        user
        ?<div className="App">
            <Nav user={user} />
            <Channel user={user} />
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
