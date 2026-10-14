const toggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
rootElement.setAttribute('data-theme', savedTheme);
updateButtonText(savedTheme);

toggleBtn.addEventListener('click', () => {
    const currentTheme = rootElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    rootElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    updateButtonText(newTheme);
});


function updateButtonText(theme) {
    toggleBtn.innerHTML = theme === 'dark' ? '<img src="images/darkicon.svg" alt="Dark Home">' : '<img src="images/lighticon.svg" alt="Light Home">';
}