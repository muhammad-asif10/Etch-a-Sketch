const INITIAL_COLOR = "#1f1f1f";
const INITIAL_GRID_SIZE = 20;

let selectedTool = "paint";
let activeColor = INITIAL_COLOR;
let currentGridSize = INITIAL_GRID_SIZE;
let mousePressed = false;

const board = document.getElementById("drawingBoard");
const colorInput = document.getElementById("paintColor");
const sizeText = document.getElementById("boardSize");
const slider = document.getElementById("boardSlider");

const paintButton = document.getElementById("paintMode");
const rainbowButton = document.getElementById("multiColorMode");
const eraseButton = document.getElementById("removeMode");
const clearButton = document.getElementById("resetBoard");

function initializeBoard(size) {
  board.innerHTML = "";

  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  const totalSquares = size * size;

  for (let i = 0; i < totalSquares; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel-box");

    pixel.addEventListener("mousedown", colorPixel);
    pixel.addEventListener("mouseover", colorPixel);

    board.appendChild(pixel);
  }
}

function colorPixel(event) {
  if (event.type === "mouseover" && !mousePressed) return;

  let fillColor = activeColor;

  if (selectedTool === "rainbow") {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    fillColor = `rgb(${red}, ${green}, ${blue})`;
  }

  if (selectedTool === "erase") {
    fillColor = "#ffffff";
  }

  event.target.style.backgroundColor = fillColor;
}

function updateTool(toolName) {
  selectedTool = toolName;

  document.querySelectorAll("button").forEach((button) => {
    button.classList.remove("selected");
  });

  if (toolName === "paint") paintButton.classList.add("selected");
  if (toolName === "rainbow") rainbowButton.classList.add("selected");
  if (toolName === "erase") eraseButton.classList.add("selected");
}

function refreshSizeLabel(value) {
  sizeText.textContent = `${value} × ${value}`;
}

function resizeBoard(value) {
  currentGridSize = value;
  refreshSizeLabel(value);
  initializeBoard(value);
}

colorInput.addEventListener("input", (event) => {
  activeColor = event.target.value;
});

paintButton.addEventListener("click", () => updateTool("paint"));
rainbowButton.addEventListener("click", () => updateTool("rainbow"));
eraseButton.addEventListener("click", () => updateTool("erase"));

clearButton.addEventListener("click", () => {
  initializeBoard(currentGridSize);
});

slider.addEventListener("input", (event) => {
  refreshSizeLabel(event.target.value);
});

slider.addEventListener("change", (event) => {
  resizeBoard(event.target.value);
});

document.body.addEventListener("mousedown", () => {
  mousePressed = true;
});

document.body.addEventListener("mouseup", () => {
  mousePressed = false;
});

window.addEventListener("load", () => {
  initializeBoard(INITIAL_GRID_SIZE);
  updateTool("paint");
});