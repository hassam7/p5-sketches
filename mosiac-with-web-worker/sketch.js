const worker = new Worker("./compute-brightness.js");
const results = {};
const images = [];

let obama;
let imgWidth = 600;
let imgHeight = 749;
let scalingFactor = 12;
let widthScaled;
let heightScaled;
let smaller;
const brightImages = new Array(256);
const isReady = () => Object.keys(results).length === images.length;
worker.onmessage = function (e) {
  const { index, brightness, image } = e.data;
  // ImageDataToBlob(image).then((r) => console.log(r));
  results[index] = brightness;
  if (isReady()) {
    console.log("All brightness values calculated: ", images.length);
    computeRelativeBrightness();
  }
};

function computeRelativeBrightness() {
  const brightnessValues = Object.values(results);
  for (let i = 0; i < brightImages.length; i++) {
    let record = 256;
    for (let j = 0; j < brightnessValues.length; j++) {
      const diff = Math.abs(i - brightnessValues[j]);
      if (diff < record) {
        record = diff;
        brightImages[j] = images[j];
      }
    }
  }
}

function preload() {
  obama = loadImage("../mosiac/obama.jpg");
  for (let i = 1; i < 1500; i++) {
    const image = loadImage(`../mosiac/images3/File_${i}.jpg`, (imageE) => {
      imageE.resize(12, 12);
      imageE.loadPixels();
      worker.postMessage({
        index: i,
        imageHeight: imageE.height,
        imageWidth: imageE.width,
        pixelArray: imageE.pixels,
      });
    });
    images.push(image);
  }
}

function setup() {
  pixelDensity(1);
  widthScaled = imgWidth / scalingFactor;
  heightScaled = imgHeight / scalingFactor;
  smaller = createImage(widthScaled, heightScaled);
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
}

function draw() {
  if (!isReady()) return;
  smaller.loadPixels();
  colorMode(RGB);
  const height = floor(heightScaled);
  const width = floor(widthScaled);
  const notFound = {};
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (x + y * widthScaled) * 4;
      const red = smaller.pixels[index + 0];
      const green = smaller.pixels[index + 1];
      const blue = smaller.pixels[index + 2];
      const alpha = smaller.pixels[index + 3];
      const colorAtIndex = color(red, green, blue, alpha);
      const b = brightness(colorAtIndex);
      let imageIndex = floor(b);
      const imagePiece = brightImages[imageIndex];
      if (Number.isNaN(b)) debugger;
      if (!imagePiece) {
        if (!notFound[imageIndex]) {
          notFound[imageIndex] = 1;
        } else {
          notFound[imageIndex] = notFound[imageIndex] + 1;
        }
      }
      if (imagePiece)
        image(
          imagePiece,
          x * scalingFactor,
          y * scalingFactor,
          scalingFactor,
          scalingFactor
        );
      else {
        fill(b);
        rect(
          x * scalingFactor,
          y * scalingFactor,
          scalingFactor,
          scalingFactor
        );
      }
    }
  }
  noLoop();
}
