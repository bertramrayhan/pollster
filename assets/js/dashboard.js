import { showNotification } from "./notification.js";

let logoutBtn = document.querySelector('.logout-btn');

logoutBtn.addEventListener('click', logout);
document.addEventListener('DOMContentLoaded', checkLoginStatus);

function makeResponse(body = undefined){
    if(body === undefined){
        return {
            method: 'GET'
        }
    }else {
        return {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

async function checkLoginStatus() {
    try {
        const response = await fetch('php/index.php?action=checkLoginStatus', makeResponse({}));

        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const confirmation = await response.json();
        if(!confirmation.loggedIn){
            window.location.href = 'auth.html';
        }

    } catch (error) {
        console.error(error);
        window.location.href = 'auth.html';
    }
}

async function logout(){
    try {
        const response = await fetch('php/index.php?action=logout', makeResponse({}));

        if(!response.ok){
            throw new Error(`HTTP error! status ${response.status}`);
        }

        const confirmation = await response.json();
        console.log(confirmation.message);

        if(confirmation.success){
            showNotification(true, 'Logout berhasil!');

            setTimeout(() => {
                window.location.href = 'auth.html';
            }, 1500);
        }

    } catch (error) {
        console.error(error);
    }
}