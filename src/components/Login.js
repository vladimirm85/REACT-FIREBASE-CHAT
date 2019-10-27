import React, { useState } from 'react';
import { firebase } from '../firebase';

const Login = () => {
    const [authError, setAuthError] = useState (null);
    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .catch(error => {setAuthError(error);});
    };
    const handleFacebookSignIn = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .catch(error => {setAuthError(error);});
    };
    return (
        <div className="Login">
            <h1>Chat!</h1>
            <button onClick={handleGoogleSignIn}>
                Sign in with Google
            </button>
            <button onClick={handleFacebookSignIn}>
                Sign in with Facebook
            </button>
            {authError && (
                <div>
                    <p>Sorry, there was a problem</p>
                    <p><i>{authError.message}</i></p>
                    <p>Please try again</p>
                </div>
            )}
        </div>
    );
};

export default Login;