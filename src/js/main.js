import '../styles/main.scss';

// переключение кнопки в section-contact
const btns = document.querySelectorAll('.contact__radio-btn');

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});