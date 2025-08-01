import { formatTanggalIndo } from "./util.js";

let pollCardsContainer = document.getElementById('poll-cards-container');
const pollCardTemplate = document.getElementById('poll-card-template');

export function loadPollCards(polls){
    while(pollCardsContainer.firstChild){
        pollCardsContainer.removeChild(pollCardsContainer.firstChild);
    }

    if (polls.length === 0) {
        let placeHolder = document.createElement('p');
        placeHolder.textContent = 'Belum ada poll yang dibuat.';
        placeHolder.style.textAlign = 'center';
        pollCardsContainer.appendChild(placeHolder);
        return;
    }

    for (const poll of polls) {
        const pollCardClone = pollCardTemplate.content.cloneNode(true);

        pollCardClone.querySelector('.poll-card').href = `detailPoll.html?slug=${poll.slug}`;

        pollCardClone.querySelector('.question').textContent = poll.question;

        pollCardClone.querySelector('.author').textContent = poll.author;

        pollCardClone.querySelector('.created-date').textContent = formatTanggalIndo(poll.created_at);

        pollCardClone.querySelector('.vote-count').textContent = poll.vote_count;

        pollCardsContainer.appendChild(pollCardClone);
    }
}