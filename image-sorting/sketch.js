let isSorted = false;
const sorter = new Worker("./sorting-worker.js");
sorter.onmessage = (event) => {
  chunkedArray = event.data.chunkedArray;
  isSorted = true;
};
let image;
let imagePixels;
let chunkedArray;

function preload() {
  image = loadImage("./images/sunflower.jpg");
  image.loadPixels();
}
function setup() {
  createCanvas(image.width, image.height);
  background(51);

  image.loadPixels();
  sorter.postMessage({ array: image.pixels });
}
const gen = drawPixels();
function draw() {
  if (isSorted) gen.next();
}

function* drawPixels() {
  const pixelArray = chunkedArray;
  const height = floor(image.height);
  const width = floor(image.width);
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (x + y * image.width) * 4;
      const red = pixelArray[index + 0];
      const green = pixelArray[index + 1];
      const blue = pixelArray[index + 2];
      const alpha = pixelArray[index + 3];
      pixels[index + 0] = red;
      pixels[index + 1] = green;
      pixels[index + 2] = blue;
      pixels[index + 3] = alpha;
    }
    updatePixels();
    yield;
  }
}
