// src/app.ts
let thirstLevel: number = 100;
let thirstDepletionRate: number = 0.2;

const thirstBar: HTMLElement = document.getElementById("thirstBar")!;

// ------ Update the thirst bar ------
function updateThirstBar(): void {
  thirstLevel -= thirstDepletionRate;
  if (thirstLevel <= 0) {
    thirstLevel = 0;
    alert("Your plant is too thirsty! Water it soon!");
  }
  thirstBar.style.width = `${thirstLevel}%`;
}

setInterval(updateThirstBar, 1000);

// ------ Toggle day/night ------
const themeToggle: HTMLElement = document.getElementById("themeToggle")!;
let isDayTime: boolean = true; // Start with day mode

themeToggle.addEventListener("click", () => {
  isDayTime = !isDayTime;
  document.body.style.backgroundColor = isDayTime ? "#f0f0f0" : "#2c3e50";
  themeToggle.innerHTML = isDayTime ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
});

// ------ Water the plant ------
const resetButton: HTMLButtonElement = document.createElement("button");
resetButton.textContent = "Water the plant!";
document.body.appendChild(resetButton);
resetButton.addEventListener("click", () => {
  thirstLevel = 100;
  thirstBar.style.width = "100%";
});
