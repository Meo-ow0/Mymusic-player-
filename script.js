// FIND THIS SECTION IN YOUR SCRIPT AND UPDATE IT
const artInput = document.getElementById('art-input');
const bannerPreview = document.getElementById('banner-preview');

artInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // ONLY set the source of the banner, NOT the body background!
            bannerPreview.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});


// Ensure the code runs after HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio();
    const statusDisplay = document.getElementById('status-display');
    const timeDisplay = document.getElementById('live-time');
    const dateDisplay = document.getElementById('live-date');

    // 1. Clock Logic
    function updateClock() {
        if (timeDisplay && dateDisplay) {
            const now = new Date();
            timeDisplay.innerText = now.toLocaleTimeString();
            dateDisplay.innerText = now.toLocaleDateString();
        }
    }
    // Update every second
    setInterval(updateClock, 1000);
    updateClock(); // Run once immediately

    // 2. Note Persistence (Your previous request)
    const noteArea = document.querySelector('textarea');
    if (noteArea) {
        noteArea.value = localStorage.getItem('myNote') || "";
        noteArea.addEventListener('input', () => {
            localStorage.setItem('myNote', noteArea.value);
        });
    }

    // 3. Music Controls
    const playlistItems = document.querySelectorAll('#playlist li');
    playlistItems.forEach(item => {
        item.addEventListener('click', () => {
            audio.src = item.getAttribute('data-src');
            statusDisplay.innerText = "Playing: " + item.innerText;
            audio.play();
            statusDisplay.classList.add('playing-animation');
        });
    });

    document.getElementById('play-btn')?.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            statusDisplay.classList.add('playing-animation');
        } else {
            audio.pause();
            statusDisplay.classList.remove('playing-animation');
        }
    });
});