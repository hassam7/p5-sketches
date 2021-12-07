let width = 600;
let height = 600;
function setup() {
  createCanvas(width, height);
}

function draw() {
  background(0);
  noFill();
  stroke(255);
  drawCircle(300, 200, 300);
  noLoop();
}

function drawCircle(x, y, d) {
  ellipse(x, y, d);
  if (d > 2) {
    drawCircle(x + d * 0.5, y, d * 0.5);
    drawCircle(x - d * 0.5, y, d * 0.5);
  }
}
