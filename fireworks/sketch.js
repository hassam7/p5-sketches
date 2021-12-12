let fireworks = [];
let gravity;
function setup() {
  color(HSB);
  createCanvas(500, 400);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw() {
  background(0, 25);
  if (random(1) < 0.04) {
    fireworks.push(new Firework());
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    const firework = fireworks[i];
    firework.update();
    firework.show();
    if (firework.done()) {
      fireworks.splice(i, 1);
    }
  }
}
