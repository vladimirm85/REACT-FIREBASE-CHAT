import firebase from 'firebase/app';
import 'firebase/firestore';
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

const dataBase = firebase.firestore();

export { dataBase, firebase };