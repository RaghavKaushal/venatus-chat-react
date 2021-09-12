import firebase from "firebase";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyAn8KeqZfmXjCO7yl2Y_7hTgwAlx9ssW9c",
    authDomain: "venatus-chat.firebaseapp.com",
    projectId: "venatus-chat",
    storageBucket: "venatus-chat.appspot.com",
    messagingSenderId: "829508392928",
    appId: "1:829508392928:web:0042ccd8505c0e5ca57d85"
  }).auth();