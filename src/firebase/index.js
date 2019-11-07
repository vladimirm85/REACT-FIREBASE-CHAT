import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCewRFUBZITdFAU7IXvOLw0ugsNJaT96F0",
    authDomain: "react-chat-d0312.firebaseapp.com",
    databaseURL: "https://react-chat-d0312.firebaseio.com",
    projectId: "react-chat-d0312",
    storageBucket: "react-chat-d0312.appspot.com",
    messagingSenderId: "682458583392",
    appId: "1:682458583392:web:b7620c38c43516f7694e05",
    measurementId: "G-X51JZ0RFS6"
};

firebase.initializeApp(firebaseConfig);

export const dataBase = firebase.firestore();
export const realTimeDataBase = firebase.database();

export const setupUserPresence = user => {
    const isOfflineForRTDB = {
        state: 'offline',
        lastChanget: firebase.database.ServerValue.TIMESTAMP
    };
    const isOnlineForRTDB = {
        state: 'online',
        lastChanget: firebase.database.ServerValue.TIMESTAMP
    };
    const isOfflineForFirestore = {
        state: 'offline',
        lastChanget: firebase.firestore.FieldValue.serverTimestamp()
    };
    const isOnlineForFirestore = {
        state: 'online',
        lastChanget: firebase.firestore.FieldValue.serverTimestamp()
    };
    const realTimeDataBaseRef = realTimeDataBase.ref(`status/${user.id}`);
    const userDoc = dataBase.doc(`users/${user.id}`);
    /*{
        "rules": {
            ".read": "auth != null",
                ".write": "auth != null"
        }
    }*/
    realTimeDataBase.ref('.info/connected').on('value', snapshot => {
        if (!snapshot.val()) {
            userDoc.update({
                status: isOfflineForFirestore
            });
        };

        if (snapshot.val()) {
            realTimeDataBaseRef.onDisconnect().set(isOfflineForRTDB)
                .then(response => {
                    realTimeDataBaseRef.set(isOnlineForRTDB);
                    userDoc.update({
                        status: isOnlineForFirestore
                    });
                })
                .catch(error => console.log(error));
        }
    });
};

export { firebase };