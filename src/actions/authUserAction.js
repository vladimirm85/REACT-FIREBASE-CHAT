import { firebase, dataBase, setupUserPresence } from '../firebase';

export const GET_AUTH_USER = 'GET_AUTH_USER';
const getAuthUser = authUser => {
    return {
        type: GET_AUTH_USER,
        payload: {
            authUser
        }
    };
};

export const AUTH_USER_LOG_OUT = 'AUTH_USER_LOG_OUT';
export const authUserLogOut = () => ({ type: AUTH_USER_LOG_OUT });

export const handleGetAuthUser = () => {
    return dispatch => {
        return firebase.auth().onAuthStateChanged(firebaseAuthUser => {
            if (firebaseAuthUser) {
                const authUser = {
                    displayName: firebaseAuthUser.displayName,
                    photoUrl: firebaseAuthUser.photoURL,
                    id: firebaseAuthUser.uid,
                    channels: {
                        general: true
                    }
                };

                dataBase
                    .collection('users')
                    .doc(authUser.id)
                    .set(authUser, { merge: true });

                dataBase
                    .collection('users')
                    .doc(authUser.id)
                    .onSnapshot(snapshot => {
                        const userFromFirestore = snapshot.data();
                        const updatedAuthUser = {
                            ...authUser,
                            channels: {
                                ...userFromFirestore.channels
                            }
                        }
                        dispatch(getAuthUser(updatedAuthUser));
                    });

                setupUserPresence(authUser);
            };
        }, error => console.log(error));
    };
};