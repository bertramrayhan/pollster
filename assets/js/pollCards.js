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
        
        pollCardClone.querySelector('.poll-card').setAttribute('data-id-poll', poll['id_poll']);

        pollCardClone.querySelector('.question').textContent = poll.question;

        pollCardClone.querySelector('.poll-card__top__actions').style.display = poll['is_owner'] === 0 ? 'none' : 'flex';

        pollCardClone.querySelector('.author').textContent = poll.author;

        pollCardClone.querySelector('.created-date').textContent = formatTanggalIndo(poll.created_at);

        pollCardClone.querySelector('.vote-count').textContent = poll.vote_count;

        pollCardsContainer.appendChild(pollCardClone);
    }
}