"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const firebase_1 = require("firebase");
const url = require("url");
const path = require("path");
// 아래 둘 중 하나가 참이면 => protocol 뒤에 // 가 붙는다
// protocol begins with http, https, ftp, gopher, or file
// slashes is true
const html = url.format({
    protocol: 'file',
    pathname: path.join(__dirname + `../../../static/index.html`)
});
firebase_1.default.initializeApp({
    apiKey: "AIzaSyCP1VG3QRl_Xxvu9tjQbHn--vZBniYxKKI",
    // authDomain: "electron-d0a95.firebaseapp.com", // auth with popup or redirect
    databaseURL: "https://electron-d0a95-default-rtdb.firebaseio.com",
    projectId: "electron-d0a95",
    // storageBucket: "electron-d0a95.appspot.com", // storage
    // messagingSenderId: "320415324018", // cloud messaging
    // appId: "1:320415324018:web:3b61480f0d470066ac6feb",
    // measurementId: "G-QW8GV9LJNF"
});
const auth = firebase_1.default.auth();
const database = firebase_1.default.database();
// auth.onAuthStateChanged((user: { email: string; }) => {
//     console.log(user);
// });
electron_1.app.on('ready', () => {
    console.log('ready');
    const win = new electron_1.BrowserWindow({
        width: 500,
        minWidth: 500,
        maxWidth: 900,
        height: 700,
        minHeight: 700,
        maxHeight: 700,
        maximizable: false
    });
    win.loadURL(html);
    electron_1.ipcMain.on('request-login', (event, arg) => __awaiter(void 0, void 0, void 0, function* () {
        let user = null;
        try {
            user = yield auth.signInWithEmailAndPassword(arg.email, arg.password);
        }
        catch (error) {
            if (isFirebaseError(error)) {
                console.log(error);
                event.sender.send('login-error', error.message);
                return;
            }
            else {
                throw error;
            }
        }
        if (user) {
            event.sender.send('login-success');
            const ref = database.ref();
            ref.child('general').on('value', (snapshot) => {
                const messageObject = snapshot.val();
                win.webContents.send('general-message', messageObject);
            });
        }
    }));
    electron_1.ipcMain.on('request-logout', (event) => __awaiter(void 0, void 0, void 0, function* () {
        if (auth.currentUser) {
            try {
                yield auth.signOut();
            }
            catch (error) {
                console.log(error);
                return;
            }
            event.sender.send('logout-success');
        }
    }));
    // auth.signInWithEmailAndPassword('kweb@gmail.com', 'kweb2021');
});
function isFirebaseError(arg) {
    return arg.code !== undefined && arg.message !== undefined;
}
//# sourceMappingURL=index.js.map