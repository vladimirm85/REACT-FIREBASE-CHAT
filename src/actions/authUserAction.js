import { firebase, dataBase } from '../firebase';

export const GET_AUTH_USER = 'GET_AUTH_USER';
const getAuthUser = authUser => {
    return {
        type: GET_AUTH_USER,
        payload: {
            authUser
        }
    };
};

export const handleGetAuthUser = () => {
    return dispatch => {
        return firebase.auth().onAuthStateChanged(firebaseAuthUser => {
            if (firebaseAuthUser) {
                const authUser = {
                    displayName: firebaseAuthUser.displayName,
                    photoUrl: firebaseAuthUser.photoURL,
                    id: firebaseAuthUser.uid
                };
                dataBase
                    .collection('users')
                    .doc(authUser.id)
                    .set(authUser, { merge: true });
                dispatch(getAuthUser(authUser));
            };
        }, error => console.log(error));
    };
};