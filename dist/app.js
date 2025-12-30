"use strict";
// src/app.ts
// ----------- Thirst system -----------
const THIRST_DEPLETION_RATE = 0.5;
let thirstLevel = 100;
const thirstBar = document.getElementById("thirstBar");
function updateThirstBar() {
    thirstLevel -= THIRST_DEPLETION_RATE;
    if (thirstLevel <= 0) {
        thirstLevel = 0;
        alert("Your fern is thirsty! Water it.");
    }
    thirstBar.style.width = `${thirstLevel}%`;
}
setInterval(updateThirstBar, 1000);
// ----------- Water button -----------
const waterButton = document.getElementById("water-btn");
waterButton.addEventListener("click", () => {
    thirstLevel = 100;
    thirstBar.style.width = "100%";
    thirstBar.classList.add("watering");
    setTimeout(() => thirstBar.classList.remove("watering"), 400);
});
// ----------- Day / Night toggle -----------
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
let isDayTime = true;
themeToggle.addEventListener("click", () => {
    themeIcon.classList.add("rotate-out");
    setTimeout(() => {
        isDayTime = !isDayTime;
        themeIcon.src = isDayTime
            ? "assets/icons/sun.svg"
            : "assets/icons/moon.svg";
        themeIcon.alt = isDayTime ? "Day mode" : "Night mode";
        document.body.classList.toggle("night", !isDayTime);
        themeIcon.classList.remove("rotate-out");
    }, 300);
});
