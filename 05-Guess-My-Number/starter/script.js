'use strict';

const numInput = document.querySelector('.guess');
const checkButton = document.querySelector('.check');
const secretNumberHTML = document.querySelector('.number');
const scoreHTML = document.querySelector('.score');
const highScoreHTML = document.querySelector('.highscore');
const messageHTML = document.querySelector('.message');

// When the Enter is pressed
numInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkButton.click();
    }
});

let secretNumber = Math.trunc(Math.random() * 20 + 1);
let highScore = 0;
let score = 20;

console.log(secretNumber)

const checkGuessedNumber = () => {
    let guessedNumber = numInput.value;
    // no input
    if (!guessedNumber) {
        messageHTML.textContent = `Number? (-_-)`;
    } else if (score > 1) {
        // range check
        if (+guessedNumber < 1 || +guessedNumber > 20) {
            score--;
            scoreHTML.textContent = String(score);
            messageHTML.textContent = `Between 1 and 20 (-_-)`;

        }
        // winning
        else if (+guessedNumber === secretNumber) {
            secretNumberHTML.textContent = String(secretNumber);
            highScore = score;
            highScoreHTML.textContent = String(highScore);
            messageHTML.textContent = `Correct! (^_^)`;
            document.querySelector('body').style.backgroundColor = '#60b347';
            document.querySelector('.number').style.width = '30rem';
        }
        // greater than secret
        else if (+guessedNumber > secretNumber) {
            score--;
            scoreHTML.textContent = String(score);
            messageHTML.textContent = `Too high! (~_~)`;
        }
        // lower than secretNumber
        else if (+guessedNumber < secretNumber) {
            score--;
            scoreHTML.textContent = String(score);
            messageHTML.textContent = `Too low! (~_~)`;
        }
    }
    // losing
    else {
        scoreHTML.textContent = '0';
        messageHTML.textContent = `You lost (т_т)`;
    }
}

checkButton.onclick = checkGuessedNumber;

/*
TODO:
    - Changing the range ?
    - Winning - blocking everything except again button
    - Split up into functions
    - Score update
    - Again button
 */



