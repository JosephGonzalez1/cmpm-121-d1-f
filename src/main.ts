import fireEmoji from "./Fire.jpg";
import "./style.css";

let counter = 0;
let growthRate = 0;
let lastTime = performance.now();

interface Upgrade {
  name: string;
  baseCost: number;
  cost: number;
  rate: number;
  count: number;
}

const upgrades: Upgrade[] = [
  { name: "Wood", baseCost: 10, cost: 10, rate: 0.1, count: 0 },
  { name: "Charcoal", baseCost: 100, cost: 100, rate: 2.0, count: 0 },
  { name: "Gasoline", baseCost: 1000, cost: 1000, rate: 50.0, count: 0 },
];

document.body.innerHTML = `
  <p>🔥 Counter: <span id="counter">0</span></p>
  <p>⏫ Growth Rate: <span id="rate">0.00</span> units/sec</p>
  <button id="increment">Fire: <img src="${fireEmoji}" class="icon" /></button>
  <div id="shop"></div>
`;

const counterElement = document.getElementById("counter") as HTMLSpanElement;
const rateElement = document.getElementById("rate") as HTMLSpanElement;
const incrementButton = document.getElementById(
  "increment",
) as HTMLButtonElement;
const shopElement = document.getElementById("shop") as HTMLDivElement;

upgrades.forEach((upgrade) => {
  const wrapper = document.createElement("div");
  const button = document.createElement("button");
  const countDisplay = document.createElement("span");

  button.id = `upgrade-${upgrade.name}`;
  countDisplay.id = `count-${upgrade.name}`;

  button.textContent = `Buy ${upgrade.name} (Cost: ${
    upgrade.cost.toFixed(2)
  }, +${upgrade.rate}/s)`;
  countDisplay.textContent = ` | Owned: ${upgrade.count}`;
  button.disabled = true;

  wrapper.appendChild(button);
  wrapper.appendChild(countDisplay);
  shopElement.appendChild(wrapper);

  button.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost;
      upgrade.count++;
      growthRate += upgrade.rate;
      upgrade.cost *= 1.15;
      updateDisplay();
    }
  });
});

function updateDisplay() {
  counterElement.textContent = counter.toFixed(2);
  rateElement.textContent = growthRate.toFixed(2);
  upgrades.forEach((upgrade) => {
    const button = document.getElementById(
      `upgrade-${upgrade.name}`,
    ) as HTMLButtonElement;
    const countDisplay = document.getElementById(
      `count-${upgrade.name}`,
    ) as HTMLSpanElement;
    button.disabled = counter < upgrade.cost;
    button.textContent = `Buy ${upgrade.name} (Cost: ${
      upgrade.cost.toFixed(2)
    }, +${upgrade.rate}/s)`;
    countDisplay.textContent = ` | Owned: ${upgrade.count}`;
  });
}

incrementButton.addEventListener("click", () => {
  counter++;
  updateDisplay();
});

function animate(time: number) {
  const delta = time - lastTime;
  lastTime = time;
  counter += growthRate * (delta / 1000);
  updateDisplay();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
