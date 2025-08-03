import { putNotification, showNotification } from "./notification.js";
import { loadPollCards } from "./pollCards.js";
import { makeResponse, throwHTTPError, checkLoginStatus } from "./util.js";

let logoutBtn = document.querySelector('.logout-btn');
let createPollContainer = document.querySelector('.create-poll-container');
let modalBackdrop = document.querySelector('.modal-backdrop');
let createPollForm = document.getElementById('create-poll-form');
let createPollBtn = document.querySelector('.new-poll-btn');
let closeBtn = document.querySelector('.close-btn');
let pollCardsContainer = document.getElementById('poll-cards-container');

logoutBtn.addEventListener('click', logout);
document.addEventListener('DOMContentLoaded', async function(){
    await putNotification();
    await checkLoginStatus();
    await getAllPolls();
    createPollForm.reset();

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

export async function getAllPolls(){
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


createPollBtn.addEventListener('click', switchCreatePollModal);
closeBtn.addEventListener('click', switchCreatePollModal);
export function switchCreatePollModal(){
    if(createPollContainer.classList.contains('hidden')){
        createPollContainer.classList.remove('hidden');
        modalBackdrop.classList.remove('hidden');

        setTimeout(() => {
            createPollContainer.classList.add('show');
        }, 10);
    }else {
        createPollContainer.classList.remove('show');
        
        setTimeout(() => {
            createPollContainer.classList.add('hidden');
            modalBackdrop.classList.add('hidden');
            createPollForm.reset();
        }, 200);
    }
}

pollCardsContainer.addEventListener('click', function(e){
    const deleteBtn = e.target.closest('.delete-poll-btn');
    const idPoll = e.target.closest('.poll-card').dataset.idPoll; 

    if(deleteBtn){
        e.stopPropagation();
        e.preventDefault();

        deletePoll(idPoll);
    }
});

async function deletePoll(idPoll){
    try {
        const response = await fetch('php/index.php?action=deletePoll', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idPoll: idPoll })
        });

        throwHTTPError(response.ok, response.status);

        const confirmation = await response.json();
        if(confirmation.success){
            showNotification(true, confirmation.message);
            getAllPolls();
        }else {
            showNotification(false, confirmation.message);
        }

    } catch (error) {
        console.error(error);
    }
}