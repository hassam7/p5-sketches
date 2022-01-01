let video;
let scalingFactor = 16;
function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / scalingFactor, height / scalingFactor);
}

function draw() {
  background(0);
  video.loadPixels();
  loadPixels();

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      const index = (video.width - (x + 1) + y * video.width) * 4;
      const r = video.pixels[index + 0];
      const g = video.pixels[index + 1];
      const b = video.pixels[index + 2];
      const brightness = (r + g + b) / 3;
      const w = map(brightness, 0, 255, 0, scalingFactor);
      noStroke();
      fill(brightness);
      rectMode(CENTER);
      rect(x * scalingFactor, y * scalingFactor, w, w);
    }
  }
}
