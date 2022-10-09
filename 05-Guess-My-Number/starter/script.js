'use strict';

// Input field and 'check' button
const numInput = document.querySelector('.guess');
const checkButton = document.querySelector('.check');

// When the Enter is pressed
numInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkButton.click();
    }
});

checkButton.onclick = () => {
    console.log('button clicked');
}

