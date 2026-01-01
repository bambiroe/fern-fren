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
const SUNLIGHT_CHANGE_RATE = 0.5;

const sunBar = document.getElementById("sunBar") as HTMLElement;
const plantImage = document.querySelector("#plant img") as HTMLImageElement;

function updateSunlight(): void {
  if (isDayTime) {
    sunlightLevel += SUNLIGHT_CHANGE_RATE;
  } else {
    sunlightLevel -= SUNLIGHT_CHANGE_RATE;
  }

  sunlightLevel = Math.max(0, Math.min(99, sunlightLevel));

  updatePlantAppearance();

  sunBar.style.width = `${sunlightLevel}%`;
}

// ----------- Plant appearance -----------
const MAX_SEPIA: number = 60;
const MAX_GREY = 60;

function updatePlantAppearance(): void {
  if (sunlightLevel >= 50) {
    const sepiaAmount = ((sunlightLevel - 50) / 50) * MAX_SEPIA;
    plantImage.style.filter = `sepia(${sepiaAmount}%)`;
  } else {
    const greyAmount = ((50 - sunlightLevel) / 50) * MAX_GREY;
    plantImage.style.filter = `grayscale(${greyAmount}%)`;
  }
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
  plantImage.classList.add("watering");
  thirstBar.style.filter = "brightness(1.2)";
  
  setTimeout(() => {
    plantImage.classList.remove("watering");
    thirstBar.style.filter = "brightness(1)";
  }, 400);
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
