



const emojiContainer = document.querySelector('#emoji-container');
const moodHistory = document.querySelector('#mood-history');
const moodDate = document.querySelector('#mood-date');
const theme = document.querySelector('.container');
const themeBtn = document.querySelector('.theme-icon')

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

// ===================Theme Changing Logic Starts here ================

//check local storage for theme preferences
if(localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

//toggle theme and change icon

themeBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  if(document.documentElement.classList.contains('dark')) {
    localStorage.setItem('theme','dark');
    theme.classList.add('dark');
    themeBtn.textContent = 'light_mode';
  } else {
    localStorage.setItem('theme', 'light');
    themeBtn.textContent = 'dark_mode';
    theme.classList.remove('dark');
  }
})