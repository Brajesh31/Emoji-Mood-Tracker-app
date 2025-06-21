import './style.css'


document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello World!');
  
const emojiContainer = document.querySelector('#emoji-container');
const moodHistory = document.querySelector('#mood-history');
const moodDate = document.querySelector('#mood-date');
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('#theme-icon')


if (!themeToggleBtn || !themeIcon) {
  console.error("themeToggleBtn not found! Check if the ID is correct in HTML.");
  return;
}

// ===================Theme Changing Logic Starts here ================

function updateThemeIcon(isDark) {
  themeIcon.innerText = isDark? 'light_mode' : 'dark_mode';
}

//check local storage for theme preferences
const isDark = localStorage.getItem('theme') === 'dark';
document.documentElement.classList.toggle('dark', isDark);
updateThemeIcon(isDark);


//toggle theme and change icon

themeToggleBtn.addEventListener('click', () => {
  const darkModeEnabled = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', darkModeEnabled ? 'dark' : 'light');
  updateThemeIcon(darkModeEnabled);
})
  
 


emojiContainer.addEventListener('click', (e) => {
  if(e.target.classList.contains('emoji')) {
    console.log("I am clicking on emoji");
    console.log(e.target.textContent);
    
    
    const mood = e.target.textContent;
    const date = moodDate? moodDate.value || new Date().toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    saveMood(date, mood);
    displayMoodHistory();
  }
});

function saveMood(date, mood) {
  const moods = JSON.parse(localStorage.getItem('moods')) || {};
  moods[date] = mood;
  localStorage.setItem('moods', JSON.stringify(moods));
}

function displayMoodHistory() {
  const moods = JSON.parse(localStorage.getItem('moods')) || {};
  moodHistory.innerHTML = '<h2>Mood History</h2>';
  for (let date in moods) {
    moodHistory.innerHTML += `<p>${date}: ${moods[date]}</p>`;
  }
}

displayMoodHistory();


})
