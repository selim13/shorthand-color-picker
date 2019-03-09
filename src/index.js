import "./style.css";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;
console.log(width, height);

const step = height / 255;
const hue = 0;
console.log(step);
for (let i = 0; i < 255; i++) {
  ctx.fillStyle = `hsl(${i}, 100%, 50%)`;
  ctx.fillRect(width - 20, i * step, width, step);
}

ctx.fillStyle = `hsl(${hue}, 100%, 100%)`;
ctx.fillRect(0, 0, 50, 50);

function drawArea(hue) {
  for (let x = 0; x <= 256; x++) {
    for (let y = 0; y <= 256; y++) {
      ctx.fillStyle = `hsl(${hue}, ${(100 / 256) * x}%, ${(100 / 256) * y}%)`;
      ctx.fillRect(x, height - y, 1, 1);
    }
  }
}

drawArea(0);

canvas.addEventListener("click", e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.x;
  const y = e.clientY - rect.y;

  if (x >= width - 20) {
    drawArea(y);
  }
});
