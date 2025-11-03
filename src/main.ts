import fireEmoji from "./Fire.jpg";
import "./style.css";

let fire = 0;
let totalOutput = 0;
let lastTime = performance.now();

interface Item {
  name: string;
  basePrice: number;
  price: number;
  output: number;
  owned: number;
}

const availableItems: Item[] = [
  { name: "Wood", basePrice: 10, price: 10, output: 0.1, owned: 0 },
  { name: "Charcoal", basePrice: 100, price: 100, output: 2.0, owned: 0 },
  { name: "Gasoline", basePrice: 1000, price: 1000, output: 50.0, owned: 0 },
];

document.body.innerHTML = `
  <p>🔥 Fire: <span id="fire">0</span></p>
  <p>⏫ Spread Rate: <span id="rate">0.00</span> fire/sec</p>
  <button id="increment">Spread Fire: <img src="${fireEmoji}" class="icon" /></button>
  <div id="shop"></div>
`;

const fireElement = document.getElementById("fire") as HTMLSpanElement;
const rateElement = document.getElementById("rate") as HTMLSpanElement;
const incrementButton = document.getElementById(
  "increment",
) as HTMLButtonElement;
const shopElement = document.getElementById("shop") as HTMLDivElement;

for (const item of availableItems) {
  const wrapper = document.createElement("div");
  const button = document.createElement("button");
  const ownedDisplay = document.createElement("span");

  button.id = `buy-${item.name}`;
  ownedDisplay.id = `owned-${item.name}`;
  button.textContent = `Buy ${item.name} (Price: ${
    item.price.toFixed(2)
  }, +${item.output}/s)`;
  ownedDisplay.textContent = ` | Owned: ${item.owned}`;
  button.disabled = true;

  wrapper.appendChild(button);
  wrapper.appendChild(ownedDisplay);
  shopElement.appendChild(wrapper);

  button.addEventListener("click", () => {
    if (fire >= item.price) {
      fire -= item.price;
      item.owned++;
      totalOutput += item.output;
      item.price *= 1.15;
      updateDisplay();
    }
  });
}

function updateDisplay() {
  fireElement.textContent = fire.toFixed(2);
  rateElement.textContent = totalOutput.toFixed(2);

  for (const item of availableItems) {
    const button = document.getElementById(
      `buy-${item.name}`,
    ) as HTMLButtonElement;
    const ownedDisplay = document.getElementById(
      `owned-${item.name}`,
    ) as HTMLSpanElement;
    button.disabled = fire < item.price;
    button.textContent = `Buy ${item.name} (Price: ${
      item.price.toFixed(2)
    }, +${item.output}/s)`;
    ownedDisplay.textContent = ` | Owned: ${item.owned}`;
  }
}

incrementButton.addEventListener("click", () => {
  fire++;
  updateDisplay();
});

function animate(time: number) {
  const delta = time - lastTime;
  lastTime = time;
  fire += totalOutput * (delta / 1000);
  updateDisplay();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
