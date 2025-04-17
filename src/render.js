// Selecting elements
const timerDisplay = document.getElementById("time");
const startButton = document.getElementById("startBtn");
const resetButton = document.getElementById("resetBtn");
const tenMinButton = document.getElementById("tenMinBtn");
const timerContainer = document.getElementById("timerDisplay");

let isRunning = false;
let interval;
let minutes = 0;
let seconds = 10;

// Function to update timer display
function updateTimer() {
    timerDisplay.innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Start/Stop button functionality
startButton.addEventListener("click", function () {
    if (!isRunning) {
        isRunning = true;
        startButton.textContent = "Stop";
        timerContainer.style.border = "4px solid limegreen";
        timerContainer.style.transition = "border 0.5s ease-in-out"; // Add transition for smooth effect

        interval = setInterval(() => {
            if (seconds > 0 || minutes > 0) {
                seconds--;
                if (seconds === 0 && minutes > 0) {
                    seconds = 59;
                    minutes--;
                }
                updateTimer();
            } else {
                clearInterval(interval);
                isRunning = false;
                startButton.textContent = "Start";
                beepSound();
                timerContainer.style.border = "4px solid blue";
            }
        }, 1000);
    } else {
        clearInterval(interval);
        isRunning = false;
        startButton.textContent = "Start";
        timerContainer.style.border = "4px solid red";
        timerContainer.style.transition = "border 0.5s ease-in-out"; // Add transition for smooth effect
    }
});

// Reset button functionality
resetButton.addEventListener("click", function () {
    clearInterval(interval);
    isRunning = false;
    minutes = 0
    seconds = 10;
    updateTimer();
    startButton.textContent = "Start";
    timerContainer.style.border = "4px solid #888";
});

tenMinButton.addEventListener("click", function () {
    clearInterval(interval);
    isRunning = false;
    minutes = 9
    seconds = 59;
    updateTimer();
    startButton.textContent = "Start";
    timerContainer.style.border = "1px solid #888";
});

const beepSound = ()=> {
    const audio = new Audio('beep.mp3');
    audio.volume = 0.5; // Set volume to 50%
    audio.loop = false; // Set loop to false
    audio.play();
}

// Initial display update
updateTimer();