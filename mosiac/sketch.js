let obama;
let imgWidth = 600;
let imgHeight = 749;
let scalingFactor = 12;
let widthScaled;
let heightScaled;
let smaller;
const images = [];
const brightnessValues = [];
function preload() {
  obama = loadImage("./obama.jpg");
  for (let i = 0; i < 5; i++) {
    const image = loadImage(`./images/File ${i + 1}.jpg`);
    image.resize(scalingFactor, scalingFactor);
    images.push(image);
  }
}
function loadBrightnessValues() {
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    let avg = 0;
    image.loadPixels();
    for (let j = 0; j < image.pixels.length; j++) {
      let c = color(image.pixels[j]);
      let b = brightness(c);
      avg += b;
    }
    avg /= image.pixels.length;
    brightnessValues[i] = avg;
  }
  console.log(brightnessValues);
}
function setup() {
  pixelDensity(1);
  widthScaled = imgWidth / scalingFactor;
  heightScaled = imgHeight / scalingFactor;
  smaller = createImage(widthScaled, heightScaled, RGB);
  smaller.copy(
    obama,
    0,
    0,
    obama.width,
    obama.height,
    0,
    0,
    widthScaled,
    heightScaled
  );
  createCanvas(imgWidth, imgHeight);
  // image(obama, 0, 0);
  background(51);
  loadBrightnessValues();
}

function draw() {
  // smaller.loadPixels();
  // noStroke();
  // for (let x = 0; x < widthScaled; x++) {
  //   for (let y = 0; y < heightScaled; y++) {
  //     const index = (x + y * widthScaled) * 4;
  //     const red = smaller.pixels[index + 0];
  //     const green = smaller.pixels[index + 1];
  //     const blue = smaller.pixels[index + 2];
  //     const alpha = smaller.pixels[index + 3];
  //     const colorAtIndex = color(red, green, blue);
  //     const b = brightness(colorAtIndex);
  //     fill(b);
  //     rect(x * scalingFactor, y * scalingFactor, scalingFactor, scalingFactor);
  //     // circle(x * scalingFactor, y * scalingFactor, scalingFactor);
  //   }
  // }
  // noLoop();
}
