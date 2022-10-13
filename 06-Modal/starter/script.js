'use strict';

const modalWindow = document.querySelector('.modal');
const buttonsOpenModal = document.querySelectorAll('.show-modal');
const overlay = document.querySelector('.overlay');

const showModal = () => {
    modalWindow.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeModal = () => {
    modalWindow.classList.add('hidden');
    overlay.classList.add('hidden');
}

buttonsOpenModal.forEach(btn => {
    btn.addEventListener('click', showModal)
});

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