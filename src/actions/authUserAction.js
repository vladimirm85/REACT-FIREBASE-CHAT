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
                        dispatch(getAuthUser(snapshot.data()));
                    });                        
            };
        }, error => console.log(error));
    };
};