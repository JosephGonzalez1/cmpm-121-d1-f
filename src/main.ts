import fireEmoji from "./Fire.jpg";
import "./style.css";

let counter = 0;
let growthRate = 0;
let lastTime = performance.now();

document.body.innerHTML = `
  <p>Counter: <span id="counter">0</span></p>
  <button id="increment">Fire: <img src="${fireEmoji}" class="icon" /></button>
  <button id="upgrade" disabled>🔥 Purchase Upgrade (Cost: 10)</button>
`;

const counterElement = document.getElementById("counter") as HTMLSpanElement;
const incrementButton = document.getElementById(
  "increment",
) as HTMLButtonElement;
const upgradeButton = document.getElementById("upgrade") as HTMLButtonElement;

function updateCounter() {
  counterElement.textContent = counter.toFixed(2);

  upgradeButton.disabled = counter < 10;
}

incrementButton.addEventListener("click", () => {
  counter++;
  updateCounter();
});

upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1;
    updateCounter();
  }
});

function animate(time: number) {
  const delta = time - lastTime;
  lastTime = time;

  counter += growthRate * (delta / 1000);

  updateCounter();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
