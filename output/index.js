"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const firebase_1 = require("firebase");
const firebaseApp = firebase_1.default.initializeApp({
    apiKey: "AIzaSyCP1VG3QRl_Xxvu9tjQbHn--vZBniYxKKI",
    authDomain: "electron-d0a95.firebaseapp.com",
    databaseURL: "https://electron-d0a95-default-rtdb.firebaseio.com",
    projectId: "electron-d0a95",
    storageBucket: "electron-d0a95.appspot.com",
    messagingSenderId: "320415324018",
    appId: "1:320415324018:web:3b61480f0d470066ac6feb",
    measurementId: "G-QW8GV9LJNF"
});
const auth = firebase_1.default.auth();
auth.onAuthStateChanged((user) => {
    console.log(user);
});
electron_1.app.on('ready', () => {
    console.log('ready');
    auth.signInWithEmailAndPassword('kweb@gmail.com', 'kweb2021');
});
electron_1.app.on('ready', () => {
    console.log('ready');
});
//# sourceMappingURL=index.js.map