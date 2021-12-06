
let allOptions = [
  { dx: 1, dy: 0 },
  { dx: -1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: 0, dy: -1 },
];
let x;
let y;
let spacing = 10;
let rows;
let cols;
let width = 400;
let height = 400;
let grid;

function isValid(i, j) {
  if (i < 0 || i >= cols || j < 0 || j >= rows) {
    return false;
  }
  return !grid[i][j];
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
function setup() {
  createCanvas(width, height);
  cols = floor(width / spacing);
  rows = floor(height / spacing);
  x = cols / 2;
  y = rows / 2;
  background(51);
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = false;
    }
  }
  grid[x][y] = true;
}

function draw() {
  stroke(255);
  strokeWeight(spacing * 0.5);
  point(x * spacing, y * spacing);
  let options = [];
  for (let option of allOptions) {
    let newX = x + option.dx;
    let newY = y + option.dy;
    if (isValid(newX, newY)) {
      options.push(option);
    }
  }

  if (options.length > 0) {
    const r = floor(random(4));
    strokeWeight(2);
    stroke(255);
    beginShape();
    vertex(x * spacing, y * spacing);
    switch (r) {
      case 0:
        x = x + 1;
        break;
      case 1:
        x = x - 1;
        break;
      case 2:
        y = y + 1;
        break;
      case 3:
        y = y - 1;
        break;
    }
    vertex(x * spacing, y * spacing);
    endShape();
    grid[x][y] = true;
  }
}
