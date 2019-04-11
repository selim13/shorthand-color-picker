import "./style.css";
import "./variations.css";
import { create } from "domain";

const table = document.getElementById("color-table");
const colorCode = document.getElementById("color-code");
const brightness = document.getElementById("brightness");
const redBrightness = document.getElementById("red-brightness");
const greenBrightness = document.getElementById("green-brightness");
const blueBrightness = document.getElementById("blue-brightness");
const pallets = {
  reds: document.getElementById("red-colors"),
  greens: document.getElementById("green-colors"),
  blues: document.getElementById("blue-colors")
};

let currentElement = null;

function pickColor(element) {
  const r = parseInt(element.dataset.r, 10);
  const g = parseInt(element.dataset.g, 10);
  const b = parseInt(element.dataset.b, 10);

  const hex = `#${r.toString(16).charAt(0)}${g
    .toString(16)
    .charAt(0)}${b.toString(16).charAt(0)}`;
  const rgb = `rgb(${r}, ${g}, ${b})`;

  colorCode.innerHTML = `${hex} ${rgb}`;
}

function selectColor(element) {
  if (currentElement) currentElement.classList.remove("selected");
  element.classList.add("selected");
  currentElement = element;
  pickColor(element);
}

function populate(brightness) {
  const variations = { reds: [], greens: [], blues: [] };

  for (let variation in variations) {
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const element = document.createElement("button");
        element.setAttribute("type", "button");
        element.classList.add("color");

        pallets[variation].appendChild(element);
        variations[variation].push(element);

        element.addEventListener("click", e => {
          selectColor(e.target);
        });

        element.addEventListener("focus", e => {
          selectColor(e.target);
        });
      }
    }
  }

  return variations;
}

function updateColors(brightness, variations) {
  redBrightness.style["background-color"] = `rgb(${brightness}, 0, 0)`;
  greenBrightness.style["background-color"] = `rgb(0, ${brightness}, 0)`;
  blueBrightness.style["background-color"] = `rgb(0, 0, ${brightness})`;

  for (let variation in variations) {
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const color =
          variation === "reds"
            ? { r: brightness, g: y * 17, b: x * 17 }
            : variation === "greens"
            ? { r: y * 17, g: brightness, b: x * 17 }
            : variation === "blues"
            ? { r: y * 17, g: x * 17, b: brightness }
            : { r: 255, g: 255, b: 255 };

        const rgb = `rgb(${color.r}, ${color.g}, ${color.b})`;
        const element = variations[variation][16 * y + x];

        element.style["background-color"] = rgb;
        element.dataset.r = color.r;
        element.dataset.g = color.g;
        element.dataset.b = color.b;
      }
    }
  }
}

const variations = populate(255);
updateColors(255, variations);
brightness.addEventListener("input", e => {
  updateColors(parseInt(e.target.value, 10), variations);
  if (currentElement) pickColor(currentElement);
});
