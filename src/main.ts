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
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Wood",
    basePrice: 10,
    price: 10,
    output: 0.1,
    owned: 0,
    description: "Dry logs that help your fire spread a little faster.",
  },
  {
    name: "Charcoal",
    basePrice: 100,
    price: 100,
    output: 2.0,
    owned: 0,
    description:
      "Burns hotter and longer than wood — perfect for fueling the flames.",
  },
  {
    name: "Gasoline",
    basePrice: 1000,
    price: 1000,
    output: 50.0,
    owned: 0,
    description:
      "Highly flammable liquid. Great for rapid fire expansion (use carefully!).",
  },
  {
    name: "Propane Tank",
    basePrice: 10000,
    price: 10000,
    output: 250.0,
    owned: 0,
    description:
      "Pressurized fuel source — ignite it and watch your fire skyrocket.",
  },
  {
    name: "Nuclear Fuel",
    basePrice: 100000,
    price: 100000,
    output: 2000.0,
    owned: 0,
    description: "The ultimate energy source. It burns with unstoppable power.",
  },
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
  const desc = document.createElement("p");

  button.id = `buy-${item.name}`;
  ownedDisplay.id = `owned-${item.name}`;
  button.textContent = `Buy ${item.name} (Price: ${
    item.price.toFixed(2)
  }, +${item.output}/s)`;
  ownedDisplay.textContent = ` | Owned: ${item.owned}`;
  desc.textContent = item.description;
  desc.style.fontStyle = "italic";
  desc.style.fontSize = "0.9em";
  desc.style.color = "#ccc";

  button.disabled = true;

  wrapper.appendChild(button);
  wrapper.appendChild(ownedDisplay);
  wrapper.appendChild(desc);
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
