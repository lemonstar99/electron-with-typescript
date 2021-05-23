"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
function main() {
    const btnLogin = document.querySelector('#btn-login');
    const btnLogout = document.querySelector('#btn-logout');
    btnLogin.addEventListener('click', () => {
        console.log('#btn-login click');
        const input_email = document.querySelector('#email');
        const input_password = document.querySelector('#password');
        const loginObj = {
            email: input_email.value,
            password: input_password.value
        };
        electron_1.ipcRenderer.send('request-login', loginObj);
    });
    btnLogout.addEventListener('click', () => {
        console.log('#btn-logout click');
        const input_email = document.querySelector('#email');
        const input_password = document.querySelector('#password');
        input_email.value = '';
        input_password.value = '';
        electron_1.ipcRenderer.send('request-logout');
    });
    const loginSection = document.querySelector('#login-section');
    const chatSection = document.querySelector('#chat-section');
    const writeSection = document.querySelector('#write-section');
    electron_1.ipcRenderer.on('login-success', () => {
        console.log('receive : login-success');
        loginSection.style.display = 'none';
        chatSection.style.display = 'block';
        writeSection.style.display = 'block';
    });
    electron_1.ipcRenderer.on('login-error', (event, arg) => {
        console.log('receive : login-error');
        // arg as message
        console.error(arg);
    });
    electron_1.ipcRenderer.on('logout-success', () => {
        console.log('receive : logout-success');
        loginSection.style.display = 'block';
        chatSection.style.display = 'none';
        writeSection.style.display = 'none';
    });
    electron_1.ipcRenderer.on('general-message', (event, arg) => {
        console.error(arg);
    });
}
document.addEventListener('DOMContentLoaded', main);
//# sourceMappingURL=index.js.map