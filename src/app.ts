// src/app.ts

// ----------- Thirst system (water) -----------
let thirstLevel: number = 100;
const THIRST_DEPLETION_RATE: number = 1;

const thirstBar = document.getElementById("thirstBar") as HTMLElement;
const thirstContainer = document.getElementById("thirstBarContainer") as HTMLElement;

function updateThirst(): void {
  thirstLevel -= THIRST_DEPLETION_RATE;
  thirstLevel = Math.max(0, thirstLevel);

  if (thirstLevel <= 30) {
    thirstBar.classList.add("dry");
  } else {
    thirstBar.classList.remove("dry");
  }

  thirstBar.style.width = `${thirstLevel}%`;
}

// ----------- Sunlight system -----------
let sunlightLevel: number = 50;
const SUNLIGHT_RATE: number = 0.5;
const MAX_SEPIA: number = 100;

const sunBar = document.getElementById("sunBar") as HTMLElement;
const plantImage = document.querySelector("#plant img") as HTMLImageElement;

function updateSunlight(): void {
  if (isDayTime) {
    sunlightLevel += SUNLIGHT_RATE;
  } else {
    sunlightLevel -= SUNLIGHT_RATE;
  }

  const sepiaAmount = ((100 - sunlightLevel) / 100) * MAX_SEPIA;
  plantImage.style.filter = `sepia(${sepiaAmount}%)`;

  sunlightLevel = Math.max(0, Math.min(99, sunlightLevel));
  sunBar.style.width = `${sunlightLevel}%`;
}

// ----------- Global update loop -----------
setInterval(() => {
  updateThirst();
  updateSunlight();
}, 1000);

// ----------- Water button -----------
const waterButton = document.getElementById("water-btn") as HTMLButtonElement;

waterButton.addEventListener("click", () => {
  thirstLevel = 100;
  thirstBar.style.width = "100%";

  thirstBar.classList.remove("dry");
  thirstBar.classList.add("watering");
  setTimeout(() => thirstBar.classList.remove("watering"), 400);
});

// ----------- Day / Night toggle -----------
const themeToggle = document.getElementById("themeToggle") as HTMLButtonElement;
const themeIcon = document.getElementById("themeIcon") as HTMLImageElement;

let isDayTime: boolean = true;

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
