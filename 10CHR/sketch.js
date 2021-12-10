let x = 0;
let y = 0;
const spacing = 40;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background("white");
}

function draw() {
  stroke(random(255), random(255), random(255));
  strokeWeight(3);
  if (random(1) < 0.5) {
    line(x, y, x + spacing, y + spacing);
  } else {
    line(x, y + spacing, x + spacing, y);
  }
  x += spacing;
  if (x > width) {
    x = 0;
    y += spacing;
  }
  if (y > height) {
    y = 0;
    background("white");
  }
}
