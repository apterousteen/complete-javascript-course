'use strict';

//Modal window
const modalWindow = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const showModal = () => {
    modalWindow.querySelector('h1').textContent = `${currPlayer.name.toUpperCase()} WON!`;
    modalWindow.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeModal = () => {
    modalWindow.classList.add('hidden');
    overlay.classList.add('hidden');
}

document.addEventListener('click', (event) => {
    if (event.target.matches('.close-modal') || event.target.matches('.overlay')) {
        closeModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
        closeModal();
    }
});

// Game
const diceHTML = document.querySelector('.dice');
const btnDice = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const player0 = {
    score: 0,
    currScore: 0,
    scoreHTML: document.getElementById('score--0'),
    currScoreHTML: document.getElementById('current--0'),
    playerHTML: document.querySelector('.player--0'),
    name: document.querySelector('#name--0').textContent,
};

const player1 = {
    score: 0,
    currScore: 0,
    scoreHTML: document.getElementById('score--1'),
    currScoreHTML: document.getElementById('current--1'),
    playerHTML: document.querySelector('.player--1'),
    name: document.querySelector('#name--1').textContent,
};

let currPlayer = player0;

const restartGame = () => {
    player0.score = 0;
    player0.scoreHTML.textContent = 0;
    player0.currScore = 0;
    player0.currScoreHTML.textContent = 0;

    player1.score = 0;
    player1.scoreHTML.textContent = 0;
    player1.currScore = 0;
    player1.currScoreHTML.textContent = 0;

    btnDice.disabled = false;
    btnHold.disabled = false;

    currPlayer.playerHTML.classList.remove('player--winner');
    currPlayer.playerHTML.classList.remove('player--active');
    currPlayer = player0;
    currPlayer.playerHTML.classList.add('player--active');
    closeModal();
}

const switchPlayer = () => {
    currPlayer.currScore = 0;
    currPlayer.currScoreHTML.textContent = currPlayer.currScore;
    currPlayer = (currPlayer === player0) ? player1 : player0;
    player0.playerHTML.classList.toggle('player--active');
    player1.playerHTML.classList.toggle('player--active');
}

const rollDice = () => {
    // generate a number
    let diceNumber = Math.trunc(Math.random() * 6 + 1);
    // display a dice
    diceHTML.classList.remove('hidden');
    diceHTML.src = `dice-${diceNumber}.png`;
    if (diceNumber !== 1) {
        // add diceNumber to current score -> display new currScore
        currPlayer.currScore += diceNumber;
        currPlayer.currScoreHTML.textContent = currPlayer.currScore;
    } else {
        switchPlayer();
    }
}

const finishGame = () => {
    currPlayer.playerHTML.classList.remove('player--active');
    currPlayer.playerHTML.classList.add('player--winner');
    diceHTML.classList.add('hidden');
    btnDice.disabled = true;
    btnHold.disabled = true;
    setTimeout(() => {
        showModal();
    }, 1000);
}

const holdScore = () => {
    currPlayer.score += currPlayer.currScore;
    currPlayer.scoreHTML.textContent = currPlayer.score;
    if (currPlayer.score >= 100) {
        finishGame();
    } else {
        switchPlayer();
    }
}

btnDice.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNewGame.addEventListener('click', restartGame);