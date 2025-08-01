import { putNotification, showNotification } from "./notification.js";
import { loadPollCards } from "./pollCards.js";
import { makeResponse, throwHTTPError, checkLoginStatus } from "./util.js";

let logoutBtn = document.querySelector('.logout-btn');

logoutBtn.addEventListener('click', logout);
document.addEventListener('DOMContentLoaded', async function(){
    await putNotification();
    await checkLoginStatus();
    await getAllPolls();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('error') === 'poll-not-found') {
        showNotification(false, 'Poll tidak ditemukan');
    }
});

async function logout(){
    try {
        const response = await fetch('php/index.php?action=logout', makeResponse({}));

        throwHTTPError(response.ok, response.status);

        const confirmation = await response.json();

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