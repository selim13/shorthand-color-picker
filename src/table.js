import "./style.css";
import "./table.css";
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

function populate(brightness) {
  const variations = { reds: [], greens: [], blues: [] };

  for (let variation in variations) {
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const element = document.createElement("div");
        element.classList.add("color");

        element.addEventListener("click", e => {
          const r = parseInt(element.dataset.r);
          const g = parseInt(element.dataset.g);
          const b = parseInt(element.dataset.b);

          const hex = `#${r.toString(16).charAt(0)}${g
            .toString(16)
            .charAt(0)}${b.toString(16).charAt(0)}`;
          const rgb = `rgb(${r}, ${g}, ${b})`;

          colorCode.innerHTML = `${hex} ${rgb}`;
        });

        pallets[variation].appendChild(element);
        variations[variation].push(element);
      }
    }
  }

  return variations;
}
const variations = populate(255);

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

updateColors(255, variations);
brightness.addEventListener("input", e =>
  updateColors(parseInt(e.target.value, 10), variations)
);
