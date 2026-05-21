
const lightBtn = document.querySelector('.theme-switcher__btn[data-theme="light"]');
const darkBtn = document.querySelector('.theme-switcher__btn[data-theme="dark"]');

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        darkBtn.classList.add('active');
        lightBtn.classList.remove('active');
    } else {
        document.body.classList.remove('dark-theme');
        lightBtn.classList.add('active');
        darkBtn.classList.remove('active');
    }
    
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    setTheme('dark');
}

lightBtn.addEventListener('click', () => setTheme('light'));
darkBtn.addEventListener('click', () => setTheme('dark'));