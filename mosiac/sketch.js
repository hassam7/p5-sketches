let obama;
let imgWidth = 600;
let imgHeight = 749;
let scalingFactor = 12;
let widthScaled;
let heightScaled;
let smaller;
const images = [];
const brightnessValues = [];
const brightImages = new Array(256);
function preload() {
  obama = loadImage("./obama.jpg");
  for (let i = 1; i < 150; i++) {
    const image = loadImage(`./images/File_${i}.jpg`,);
    images.push(image);
  }
  console.log("All Images Loaded");
}
function loadBrightnessValues() {
  images.forEach((image) => image.resize(12, 12));

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    let avg = 0;
    image.loadPixels();
    const height = floor(image.height);
    const width = floor(image.width);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (x + y * image.width) * 4;
        const red = image.pixels[index + 0];
        const green = image.pixels[index + 1];
        const blue = image.pixels[index + 2];
        const alpha = image.pixels[index + 3];
        const colorAtIndex = color(red, green, blue, alpha);
        const b = brightness(colorAtIndex);
        if (Number.isNaN(b)) debugger;
        avg += b;
      }
    }
    avg /= image.pixels.length / 4;
    brightnessValues[i] = floor(avg);
  }
  console.log("Brigtness values calculated");
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
  console.log("Done");
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
  loadBrightnessValues();
}

function draw() {
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
        const imagePiece = brightImages[0];
        image(
          imagePiece,
          x * scalingFactor,
          y * scalingFactor,
          scalingFactor,
          scalingFactor
        );
        // fill(b);
        // rect(
        //   x * scalingFactor,
        //   y * scalingFactor,
        //   scalingFactor,
        //   scalingFactor
        // );
      }
    }
  }
  console.log(notFound);
  noLoop();
}
