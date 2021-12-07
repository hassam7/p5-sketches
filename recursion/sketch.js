let width = 700;
let height = 650;
const colors = ["red", "orange", "indigo", "pink", "beige"];

const getRandomColor = () => colors[floor(random(colors.length))];
function setup() {
  createCanvas(width, height);
}
let i = 300;
function draw() {
  background(0);
  noFill();
  stroke(255);
  strokeWeight(2)
  drawCircle(300, 325, i += 50);
  frameRate(16)
}

function drawCircle(x, y, d) {
  ellipse(x, y, d);
  if (d > 10) {
    stroke(getRandomColor());
    drawCircle(x + d * 0.5, y + d * 0.01, d * 0.5);
    drawCircle(x - d * 0.5, y - d * 0.01, d * 0.5);
    // drawCircle(x, y - d * 0.5, d * 0.5);
    // drawCircle(x, y + d * 0.5, d * 0.5);
  }
}
