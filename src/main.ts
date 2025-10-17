import fireEmoji from "./Fire.jpg";
import "./style.css";

let counter: number = 0;

document.body.innerHTML = `
  <p>Counter: <span id="counter">0</span></p>
  <button id =  increment> Fire: <img src="${fireEmoji}" class="icon" /></button>
`;

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  counter++;
  counterElement.textContent = counter.toString();
});
