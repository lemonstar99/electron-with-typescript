import { app, BrowserWindow, ipcMain } from 'electron';
import firebase from 'firebase';
import * as url from 'url';
import * as path from 'path';
import {LoginObj} from '../common/type';

// 아래 둘 중 하나가 참이면 => protocol 뒤에 // 가 붙는다
// protocol begins with http, https, ftp, gopher, or file
// slashes is true
const html = url.format({
    protocol: 'file',
    pathname: path.join(__dirname + `../../../static/index.html`)
});

firebase.initializeApp({
    apiKey: "AIzaSyCP1VG3QRl_Xxvu9tjQbHn--vZBniYxKKI", // auth. general use
    // authDomain: "electron-d0a95.firebaseapp.com", // auth with popup or redirect
    databaseURL: "https://electron-d0a95-default-rtdb.firebaseio.com", // realtime database
    projectId: "electron-d0a95",
    // storageBucket: "electron-d0a95.appspot.com", // storage
    // messagingSenderId: "320415324018", // cloud messaging
    // appId: "1:320415324018:web:3b61480f0d470066ac6feb",
    // measurementId: "G-QW8GV9LJNF"
});

const auth = firebase.auth();
const database = firebase.database();
// auth.onAuthStateChanged((user: { email: string; }) => {
//     console.log(user);
// });

app.on('ready', () => {
    console.log('ready');

    const win = new BrowserWindow({
        width: 500,
        minWidth: 500,
        maxWidth: 900,
        height: 700,
        minHeight: 700,
        maxHeight: 700,
        maximizable: false
    });
    win.loadURL(html);

    ipcMain.on('request-login', async (event, arg: LoginObj) => {
        let user = null;
        try {
            user = await auth.signInWithEmailAndPassword(arg.email, arg.password);
        } catch (error) {
            if (isFirebaseError(error)) {
                console.log(error);
                event.sender.send('login-error', error.message);
                return;
            } else {
                throw error;
            }
        }
        if (user) {
            event.sender.send('login-success');
            const ref = database.ref();
            ref.child('general').on('value', (snapshot) => {
                const messageObject = snapshot.val();
                win.webContents.send('general-message', messageObject);
            })
        }
    });

    ipcMain.on('request-logout', async event => {
        if (auth.currentUser) {
            try {
                await auth.signOut();
            } catch (error) {
                console.log(error);
                return;
            }
            event.sender.send('logout-success');
        }
    });

    // auth.signInWithEmailAndPassword('kweb@gmail.com', 'kweb2021');
});

function isFirebaseError(arg: any): arg is firebase.auth.Error {
    return arg.code !== undefined && arg.message !== undefined;
}