// Selecting elements
const timerDisplay = document.getElementById("time");
const startButton = document.getElementById("startBtn");
const resetButton = document.getElementById("resetBtn");
const tenMinButton = document.getElementById("tenMinBtn");
const twentyMinBtn = document.getElementById("twentyMinBtn");
const thirtyMinBtn = document.getElementById("thirtyMinBtn");
const timerContainer = document.getElementById("timerDisplay");

let isRunning = false;
let interval;
let minutes = 1;
let seconds = 0;

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
        timerContainer.style.transition = "border 0.5s ease-in-out";

        interval = setInterval(() => {
            if (minutes === 0 && seconds === 0) {
                clearInterval(interval);
                isRunning = false;
                startButton.textContent = "Start";
                timerContainer.style.border = "4px solid blue";
                playBeepIfEnabled();
            } else {
                if (seconds === 0) {
                    if (minutes > 0) {
                        minutes--;
                        seconds = 59;
                    }
                } else {
                    seconds--;
                }
                updateTimer();
            }
        }, 1000);
    } else {
        clearInterval(interval);
        isRunning = false;
        startButton.textContent = "Start";
        timerContainer.style.border = "4px solid red";
        timerContainer.style.transition = "border 0.5s ease-in-out";
    }
});

// Reset button functionality
resetButton.addEventListener("click", function () {
    clearInterval(interval);
    isRunning = false;
    minutes = 1
    seconds = 0;
    updateTimer();
    startButton.textContent = "Start";
    timerContainer.style.border = "4px solid #888";
});

// Ten minutes button functionality
tenMinButton.addEventListener("click", function () {
    clearInterval(interval);
    isRunning = false;
    minutes = 10
    seconds = 0;
    updateTimer();
    startButton.textContent = "Start";
    timerContainer.style.border = "4px solid #888";
});

// twenty minutes button functionality
twentyMinBtn.addEventListener("click", function () {
    clearInterval(interval);
    isRunning = false;
    minutes = 20
    seconds = 0;
    updateTimer();
    startButton.textContent = "Start";
    timerContainer.style.border = "4px solid #888";
});

// thirty minutes button functionality
thirtyMinBtn.addEventListener("click", function () {
    clearInterval(interval);
    isRunning = false;
    minutes = 30
    seconds = 0;
    updateTimer();
    startButton.textContent = "Start";
    timerContainer.style.border = "4px solid #888";
});

// custom time input functionality
const customTimeInput = document.getElementById("customTimeInput");
customTimeInput.addEventListener("input", function () {
    const customTime = parseInt(customTimeInput.value, 10);
    if (!isNaN(customTime) && customTime > 0) {
        minutes = Math.floor(customTime / 60);
        seconds = customTime % 60;
        updateTimer();
    } else {
        minutes = 0;
        seconds = 0;
        updateTimer();
    }
});

// custom time button functionality
const customTimeBtn = document.getElementById("customTimeBtn");
customTimeBtn.addEventListener("click", function () {
    clearInterval(interval);
    isRunning = false;
    const customTime = parseInt(customTimeInput.value, 10);
    if (!isNaN(customTime) && customTime > 0) {
        minutes = Math.floor(customTime / 60);
        seconds = customTime % 60;
        updateTimer();
        startButton.textContent = "Start";
        timerContainer.style.border = "4px solid #888";
    } else {
        customTimeInput.value = ""; // Clear the input if invalid
        minutes = 0;
        seconds = 0;
        updateTimer();
    }
});

//hide custom time input on load
customTimeInput.style.display = "none";
customTimeBtn.style.display = "none";
// show custom time input on button click
const customTimeToggle = document.getElementById("customTimeToggle");
customTimeToggle.addEventListener("click", function () {
    if (customTimeInput.style.display === "none") {
        customTimeInput.style.display = "block";
        customTimeBtn.style.display = "block";
        customTimeToggle.textContent = "Hide Custom Time";
    } else {
        customTimeInput.style.display = "none";
        customTimeBtn.style.display = "none";
        customTimeToggle.textContent = "Add Custom Time";
    }
});

// close button functionality
const closeButton = document.getElementById("closeBtn");
closeButton.addEventListener("click", function () {
    window.close(); // Close the window
});

// beepSound function
// Call this when the timer ends
function playBeepIfEnabled() {
    const checkbox = document.getElementById("notificationCheckbox");

    if (checkbox.checked) {
        const audio = new Audio('beep.mp3');
        audio.volume = 0.5;
        audio.play();
    }
}

// Initial display update
updateTimer();