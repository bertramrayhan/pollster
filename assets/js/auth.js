import { showNotification } from "./notification.js";

let switchLinks = document.querySelectorAll('.auth-container__switch-link');
let usernameInputLogin = document.getElementById('username-input-login');
let usernameInputRegister = document.getElementById('username-input-register');
let passwordInputLogin = document.getElementById('password-input-login');
let passwordInputRegister = document.getElementById('password-input-register');
let registerForm = document.getElementById('register-form');
let loginForm = document.getElementById('login-form');

registerForm.addEventListener('submit', function(e){
    e.preventDefault();
    const username = usernameInputRegister.value;
    const password = passwordInputRegister.value;

    checkInput(username, password);
})

loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    const username = usernameInputLogin.value;
    const password = passwordInputLogin.value;

    checkInput(username, password);
})

function checkInput(username, password) {
    if(!username || !password){
        showNotification(false, 'username atau password kosong');
    }else {
        showNotification(true, 'Login berhasil');
    }
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