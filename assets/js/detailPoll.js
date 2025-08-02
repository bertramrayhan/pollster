import { putNotification, showNotification } from "./notification.js";
import { makeResponse, throwHTTPError, checkLoginStatus } from "./util.js";

let slug = null;
let backBtn = document.querySelector('.back-btn');
let question = document.querySelector('.question');
let pollOptions = document.querySelector('.poll-options');
const pollOptionTemplate = document.getElementById('poll-option-template');
let votesContainer = document.querySelector('.votes');
const voteTemplate = document.getElementById('vote-template');
let voteForm = document.getElementById('vote-form');

backBtn.addEventListener('click', function(){
    window.location.href = 'dashboard.html';
});

document.addEventListener('DOMContentLoaded', async function(){
    putNotification();
    await checkLoginStatus();

    const urlParams = new URLSearchParams(window.location.search);
    slug = urlParams.get('slug');

    if(slug){
        await getDetailPoll(slug);
    }else {
        window.location.href = 'dashboard.html?error=poll-not-found';
    }
});

async function getDetailPoll(slug){
    try {
        const response = await fetch(`php/index.php?action=getDetailPoll&slug=${slug}`, makeResponse());

        throwHTTPError(response.ok, response.status);

        const result = await response.json();
        if(result.success){
            console.log(result.detailPoll);
            setDetailPollPage(result.detailPoll);
        }

    } catch (error) {
        console.error(error);
    }
}

function setDetailPollPage(detailPoll){
    question.textContent = detailPoll[0].question;

    while(pollOptions.firstChild){
        pollOptions.removeChild(pollOptions.firstChild);
    }

    while(votesContainer.firstChild){
        votesContainer.removeChild(votesContainer.firstChild);
    }

    const totalOptions = detailPoll.length;
    let shuffledIndices = Array.from({ length: totalOptions }, (_, i) => i);

    // 2. Acak array tersebut menggunakan Fisher-Yates shuffle
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
    }

    let index = 0;
    for (const row of detailPoll) {
        const idOption = row['id_option'];
        const optionText = row['option_text'];
        const totalVote = row['total_vote'];
        const totalVotes = row['total_votes'];

        const votePercentage = totalVotes !== 0 ? ((totalVote / totalVotes) * 100).toFixed(1) + '%' : 0;

        const pollOptionClone = pollOptionTemplate.content.cloneNode(true);

        let pollOptionRadio = pollOptionClone.querySelector('input');
        pollOptionRadio.name = 'vote';
        pollOptionRadio.id = idOption;
        
        let pollOptionLabel = pollOptionClone.querySelector('label');
        pollOptionLabel.htmlFor = idOption;
        pollOptionLabel.textContent = optionText

        pollOptions.appendChild(pollOptionClone);

        const voteClone = voteTemplate.content.cloneNode(true);

        let voteText = voteClone.querySelector('.vote-text');
        voteText.textContent = optionText;

        let totalVoteText = voteClone.querySelector('.total-vote');
        totalVoteText.textContent = totalVote;

        let votePercentageText = voteClone.querySelector('.vote-percentage');
        votePercentageText.textContent = votePercentage;



        let voteBar = voteClone.querySelector('.vote-bar__inner');
        voteBar.style.width = votePercentage;

        const saturation = '80%';
        const lightness = '55%';
        const hueStep = 360 / totalOptions;
        const randomIndex = shuffledIndices[index];
        const currentHue = randomIndex * hueStep;

        voteBar.style.backgroundColor = `hsl(${currentHue}, ${saturation}, ${lightness})`;

        votesContainer.appendChild(voteClone);

        index++;
    }
}

voteForm.addEventListener('submit', function(e){
    e.preventDefault();
    vote();
});
async function vote(){
    const selectedOption = document.querySelector('input[name="vote"]:checked');
    if(!selectedOption){
        showNotification(false, 'Tidak ada option yang dipilih');
        return;
    }

    try {
        const selectedOptionId = selectedOption.id;
        const response = await fetch('php/index.php?action=vote', makeResponse({slug:slug, idOption: selectedOptionId}))

        throwHTTPError(response.ok, response.status);

        const confirmation = await response.json();
        if(confirmation.success){
            await getDetailPoll(slug);
            showNotification(true, 'Vote berhasil!');
        }else{
            showNotification(false, confirmation.message);
        }

    } catch (error) {
        console.error(error);
    }
}