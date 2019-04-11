import "./style.css";

const $table = document.getElementById("table");
const $colorCode = document.getElementById("color-code");
let currentElement = null;

function pickColor(element) {
  const r = parseInt(element.dataset.r, 10);
  const g = parseInt(element.dataset.g, 10);
  const b = parseInt(element.dataset.b, 10);

  const hex = `#${r.toString(16).charAt(0)}${g
    .toString(16)
    .charAt(0)}${b.toString(16).charAt(0)}`;
  const rgb = `rgb(${r}, ${g}, ${b})`;

  $colorCode.innerHTML = `${hex} ${rgb}`;
}

function selectColor(element) {
  if (currentElement) currentElement.classList.remove("selected");
  element.classList.add("selected");
  currentElement = element;
  pickColor(element);
}

for (let r = 0; r < 16; r++) {
  const block = document.createElement("div");
  block.classList.add("table__block");
  $table.appendChild(block);

  for (let g = 0; g < 16; g++) {
    for (let b = 0; b < 16; b++) {
      const color = `rgb(${r * 17}, ${g * 17}, ${b * 17})`;
      const element = document.createElement("button");
      element.classList.add("table__item");
      element.style.backgroundColor = color;
      element.dataset.r = r * 17;
      element.dataset.g = g * 17;
      element.dataset.b = b * 17;
      block.appendChild(element);

      element.addEventListener("click", e => {
        selectColor(e.target);
      });

      element.addEventListener("focus", e => {
        selectColor(e.target);
      });
    }
  }
}
