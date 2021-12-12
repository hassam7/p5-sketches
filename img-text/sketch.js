let img;
let grid = [];
let gen;
function preload() {
  // load the original image
  img = loadImage("img.png");
}
let temp = {};
function setup() {
  createCanvas(img.width, img.height);
  img.resize(100, 100);
  image(img, 0, 0);
  filter(THRESHOLD, 0.9);
  loadPixels();
  fill("white");
  noStroke();
  rect(0, 0, width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (x + y * width) * 4;
      const red = pixels[index + 0]; // Red
      const green = pixels[index + 1]; // Green
      const blue = pixels[index + 2]; // Blue
      const alpha = pixels[index + 3]; // Alpha
      if (red === 0 && green === 0 && blue === 0 && alpha === 255) {
        temp[`${x},${y}`] = "black";
        // fill("white");
        // noStroke();
        // text("*", x, y);
      } else {
        temp[`${x},${y}`] = "white";
        // fill("black");
        // noStroke();
        // text("|", x, y);
      }
    }
  }
  gen = generator();
}

function draw() {
  console.log(gen.next().value);
}

function* generator() {
  let i = 0;
  for (let [key, value] of Object.entries(temp)) {
    const [x, y] = key.split(",").map((num) => Number(num));
    const color = value;
    fill("black");
    noStroke();
    text(`${color === "black" ? ">" : "|"}`, x * 1, y * 1);
    i++;
    if (i % 100000 === 0) {
      yield [color, y];
    }
  }
}
