import { showNotification } from "./notification.js";
import { loadPollCards } from "./pollCards.js";
import { makeResponse, throwHTTPError } from "./util.js";

let logoutBtn = document.querySelector('.logout-btn');

logoutBtn.addEventListener('click', logout);
document.addEventListener('DOMContentLoaded', async function(){
    await checkLoginStatus();
    await getAllPolls();
});

async function checkLoginStatus() {
    try {
        const response = await fetch('php/index.php?action=checkLoginStatus', makeResponse({}));

        throwHTTPError(response.ok, response.status);

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

        throwHTTPError(response.ok, response.status);

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

async function getAllPolls(){
    try {
        const response = await fetch('php/index.php?action=getAllPolls', makeResponse());

        throwHTTPError(response.ok, response.status);

        const result = await response.json();
        if(result.success){
            loadPollCards(result.polls);
        }

    } catch (error) {
        showNotification(false, 'Gagal memuat data poll.');
        console.error(error);
    }
}