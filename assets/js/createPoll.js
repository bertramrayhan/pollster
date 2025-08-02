import { getAllPolls, switchCreatePollModal } from "./dashboard.js";
import { showNotification } from "./notification.js";
import { makeResponse, throwHTTPError } from "./util.js";

let createPollForm = document.getElementById('create-poll-form');
let optionsContainer = document.querySelector('.options-container');
let addOptionBtn = document.querySelector('.add-option-btn');
let optionTemplate = document.getElementById('option-template');

addOptionBtn.addEventListener('click', addOption);
function addOption(){
    const optionClone = optionTemplate.content.cloneNode(true);
    optionsContainer.appendChild(optionClone);
}

createPollForm.addEventListener('click', function(e){
    const deleteBtn = e.target.closest('.delete-btn');

    if(deleteBtn){
        if(optionsContainer.childElementCount === 2){
            showNotification(false, 'Pilihan minimal 2');
            return;
        }

        e.preventDefault();

        const option = deleteBtn.closest('.option');
        if(option){
            option.remove();
        }
    }
});

createPollForm.addEventListener('submit', createPoll);

async function createPoll(e){
    e.preventDefault();

    const formData = new FormData(createPollForm);
    const dataToSend = {
        question: '',
        options: []
    };

    for (const [name, value] of formData.entries()) {
        const trimmedValue = value.trim();

        if (trimmedValue === '') {
            showNotification(false, 'Semua kolom harus diisi');
            return;
        }

        if (name === 'question') {
            dataToSend.question = trimmedValue;
        } else if (name === 'options') {
            dataToSend.options.push(trimmedValue);
        }
    }

    try {
        const response = await fetch('php/index.php?action=createPoll', makeResponse(dataToSend));

        throwHTTPError(response.ok, response.status);

        const confirmation = await response.json();
        console.log(confirmation);

        if(confirmation.success){
            showNotification(true, confirmation.message);
            await getAllPolls();
            switchCreatePollModal();
        }else {
            showNotification(false, confirmation.message);
        }
    } catch (error) {
        console.error(error);
    }
}