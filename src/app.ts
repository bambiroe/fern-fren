// src/app.ts
// ------ Thirst System ------
let thirstLevel: number = 100;
let thirstDepletionRate: number = 0.5;
const thirstBar = document.getElementById("thirstBar") as HTMLElement;

function updateThirstBar(): void {
  thirstLevel -= thirstDepletionRate;

  if (thirstLevel <= 0) {
    thirstLevel = 0;
    alert("Your plant is thirsty! Water it soon!");
  }

  thirstBar.style.width = `${thirstLevel}%`;
}

setInterval(updateThirstBar, 1000);

// ------ Water the fern ------
const waterButton: HTMLButtonElement = document.createElement("button");

waterButton.textContent = "WATER :)";
waterButton.id = "water-btn";

document.body.appendChild(waterButton);

waterButton.addEventListener("click", () => {
  thirstLevel = 100;
  thirstBar.style.width = "100%";
  thirstBar.classList.add("watering");

  setTimeout(() => thirstBar.classList.remove("watering"), 400);
});

// ------ Toggle day/night ------
const themeToggle = document.getElementById("themeToggle") as HTMLButtonElement;
const themeIcon = document.getElementById("themeIcon") as HTMLImageElement;

let isDayTime: boolean = true;

themeToggle.addEventListener("click", () => {
  // Animate current icon out
  themeIcon.classList.add("rotate-out");

  setTimeout(() => {
    // Toggle state
    isDayTime = !isDayTime;

    // Swap icon
    themeIcon.src = isDayTime
      ? "assets/icons/sun.svg"
      : "assets/icons/moon.svg";

    themeIcon.alt = isDayTime ? "Day mode" : "Night mode";

    // Toggle background + class
    document.body.style.backgroundColor = isDayTime
      ? "#f0f0f0"
      : "#2c3e50";

    document.body.classList.toggle("night", !isDayTime);

    // Animate new icon in
    themeIcon.classList.remove("rotate-out");
    themeIcon.classList.add("rotate-in");

    setTimeout(() => {
      themeIcon.classList.remove("rotate-in");
    }, 600);
  }, 300);
});
