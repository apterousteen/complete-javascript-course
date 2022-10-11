'use strict';

const numInput = document.querySelector('.guess');
const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');
const secretNumberHTML = document.querySelector('.number');
const scoreHTML = document.querySelector('.score');
const highScoreHTML = document.querySelector('.highscore');
const messageHTML = document.querySelector('.message');

let secretNumber = Math.trunc(Math.random() * 20 + 1);
let highScore = 0;
let score = 20;

const updateScore = () => {
    score--;
    scoreHTML.textContent = score;
}

const updateHighScore = () => {
    if (highScore < score) {
        highScore = score;
        highScoreHTML.textContent = highScore;
    }
}

/**
 * @param {string} bgColor
 * @param {string} secretNumberWidth
 */
const changeStyle = (bgColor, secretNumberWidth) => {
    document.querySelector('body').style.backgroundColor = bgColor;
    document.querySelector('.number').style.width = secretNumberWidth;
}

// Again button
againButton.addEventListener('click', () => {
    secretNumber = Math.trunc(Math.random() * 20 + 1);
    secretNumberHTML.textContent = '?';
    score = 20;
    scoreHTML.textContent = score;
    messageHTML.textContent = 'Start guessing...';
    numInput.value = '';
    changeStyle('#222', '15rem');
    numInput.disabled = false;
    checkButton.disabled = false;
});

// Enter or Space
numInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkButton.click();
    }
});
document.addEventListener('keypress', (event) => {
    if (event.key === ' ') {
        event.preventDefault();
        againButton.click();
    }
})

const checkGuessedNumber = () => {
    let guessedNumber = numInput.value;
    // no input
    if (!guessedNumber) {
        messageHTML.textContent = `Number? (-_-)`;
    } else if (score > 1) {
        // range check
        if (+guessedNumber < 1 || +guessedNumber > 20) {
            updateScore();
            messageHTML.textContent = `Between 1 and 20 (-_-)`;
        }
        // winning
        else if (+guessedNumber === secretNumber) {
            secretNumberHTML.textContent = secretNumber;
            updateHighScore();
            messageHTML.textContent = `Correct! (^_^)`;
            changeStyle('#0c4502', '30rem');
            numInput.disabled = true;
            checkButton.disabled = true;
        }
        // wrong answer
        else {
            updateScore();
            messageHTML.textContent = +guessedNumber > secretNumber ? `Too high! (~_~)` : `Too low! (~_~)`;
        }
    }
    // losing
    else {
        scoreHTML.textContent = '0';
        messageHTML.textContent = `You lost (т_т)`;
    }
}

checkButton.onclick = checkGuessedNumber;



