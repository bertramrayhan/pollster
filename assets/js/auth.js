import { showNotification } from "./notification.js";

let switchLinks = document.querySelectorAll('.auth-container__switch-link');
let usernameInputLogin = document.getElementById('username-input-login');
let usernameInputRegister = document.getElementById('username-input-register');
let passwordInputLogin = document.getElementById('password-input-login');
let passwordInputRegister = document.getElementById('password-input-register');
let registerForm = document.getElementById('register-form');
let loginForm = document.getElementById('login-form');

document.addEventListener('DOMContentLoaded', function() {
    usernameInputLogin.value = '';
    passwordInputLogin.value = '';
    usernameInputRegister.value = '';
    passwordInputRegister.value = '';
})

function handleAuthSubmit(e, mode) {
    e.preventDefault();
    const username = mode === 'register' ? usernameInputRegister.value.trim() : usernameInputLogin.value.trim();
    const password = mode === 'register' ? passwordInputRegister.value.trim() : passwordInputLogin.value.trim();

    if (checkInput(username, password)) {
        authentication(username, password, mode, e);
    }
}
registerForm.addEventListener('submit', e => handleAuthSubmit(e, 'register'));
loginForm.addEventListener('submit', e => handleAuthSubmit(e, 'login'));

function checkInput(username, password) {
    if(!username || !password){
        showNotification(false, 'username atau password kosong');
        return false;
    }
    return true;
}

for (const switchLink of switchLinks) {
    switchLink.addEventListener('click', function(e){
        changePage();
    });
}
function changePage(){
    let authContainers = document.querySelectorAll('.auth-container');

    for (const authContainer of authContainers) {
        if(authContainer.classList.contains('hidden')){
            authContainer.classList.remove('hidden');
        }else {
            authContainer.classList.add('hidden');
        }
    }
}

async function authentication(username, password, mode, e){
    try {
        const response = await fetch('php/auth.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({authPage: mode, username: username, password: password})
        });

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const konfirmasi = await response.json();
        showNotification(konfirmasi.success, konfirmasi.message);
        if(konfirmasi.success){
            e.target.reset();
            if(mode === 'register'){
                changePage();
            }else{
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }
        }

    } catch (error) {
        console.error(error);
    }
}