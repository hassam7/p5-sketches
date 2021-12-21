let slider;
let video;
let scalingFactor = 16;
let cols = 40;
let rows = 30;
let boxes = [];
function setup() {
  noCanvas();
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(cols, rows);
  slider = createSlider(0, 255, 77);
  translate(20, 5);
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var box = createCheckbox();
      box.style("display", "inline");
      box.parent("mirror");
      boxes.push(box);
    }
    var linebreak = createSpan("<br/>");
    linebreak.parent("mirror");
  }
}

function draw() {
  video.loadPixels();
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      const index = (video.width - (x + 1) + y * video.width) * 4;
      const r = video.pixels[index + 0];
      const g = video.pixels[index + 1];
      const b = video.pixels[index + 2];
      const brightness = (r + g + b) / 3;
      const threshold = slider.value();
      const checkIndex = x + y * cols;
      const box = boxes[checkIndex];
      if (brightness > threshold) {
        box.checked(false);
      } else {
        box.checked(true);
      }
    }
  }
}
