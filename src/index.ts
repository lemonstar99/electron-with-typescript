import { app, BrowserWindow } from 'electron';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCP1VG3QRl_Xxvu9tjQbHn--vZBniYxKKI",
    authDomain: "electron-d0a95.firebaseapp.com",
    databaseURL: "https://electron-d0a95-default-rtdb.firebaseio.com",
    projectId: "electron-d0a95",
    storageBucket: "electron-d0a95.appspot.com",
    messagingSenderId: "320415324018",
    appId: "1:320415324018:web:3b61480f0d470066ac6feb",
    measurementId: "G-QW8GV9LJNF"
});

const auth = firebase.auth();
auth.onAuthStateChanged((user: { email: string; }) => {
    console.log(user);
});

app.on('ready', () => {
    console.log('ready');
    auth.signInWithEmailAndPassword('kweb@gmail.com', 'kweb2021');
});
