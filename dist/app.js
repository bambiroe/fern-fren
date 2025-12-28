"use strict";
// src/app.ts
let thirstLevel = 100;
let thirstDepletionRate = 0.2;
const thirstBar = document.getElementById("thirstBar");
// Function to update the thirst bar
function updateThirstBar() {
    thirstLevel -= thirstDepletionRate;
    if (thirstLevel <= 0) {
        thirstLevel = 0;
        alert("Your plant is too thirsty! Water it soon!");
    }
    thirstBar.style.width = `${thirstLevel}%`;
}
// Deplete the thirst bar every second
setInterval(updateThirstBar, 1000);
// Toggle between day and night mode
const themeToggle = document.getElementById("themeToggle");
let isDayTime = true; // Start with day mode
themeToggle.addEventListener("click", () => {
    isDayTime = !isDayTime;
    document.body.style.backgroundColor = isDayTime ? "#f0f0f0" : "#2c3e50"; // Day/Night colors
    // Use innerHTML to insert the icons properly
    themeToggle.innerHTML = isDayTime ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
});
// Optionally, add a reset button to refill the thirst
const resetButton = document.createElement("button");
resetButton.textContent = "Water the plant!";
document.body.appendChild(resetButton);
resetButton.addEventListener("click", () => {
    thirstLevel = 100;
    thirstBar.style.width = "100%";
});
