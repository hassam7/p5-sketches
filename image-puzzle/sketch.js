function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
function swap(srcI, srcJ, dstI, dstJ, array) {
  const temp = array[srcI][srcJ];
  array[dstI][dstJ] = array[srcI][srcJ];
  array[srcI][srcJ] = temp;
}
let cols = 4;
let rows = 4;
let grid;
let w;
let h;
let source;
let gameOver = false;
function preload() {
  source = loadImage("./image.png");
}
function setup() {
  createCanvas(400, 400);
  w = width / cols;
  h = height / rows;

  grid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      let img = createImage(w, h);
      img.copy(source, x, y, w, h, 0, 0, w, h);
      img.props = { i, j };
      grid[i][j] = img;
    }
  }
  img = createImage(w, h);
  grid[grid.length - 1][grid.length - 1] = -1;
}
function isInBounds(x, y) {
  if (x < 0 || x > rows - 1 || y < 0 || y > cols - 1) {
    return false;
  }
  return true;
}
function getNeighbours(x, y) {
  let neighbours = [];
  const validOptions = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
  ];
  for (let { dx, dy } of validOptions) {
    const newDx = x + dx;
    const newDy = y + dy;
    if (isInBounds(newDx, newDy)) {
      neighbours.push([newDx, newDy]);
    }
  }
  return neighbours;
}
function mousePressed() {
  let i = floor(mouseX / w);
  let j = floor(mouseY / h);
  const neighbours = getNeighbours(i, j);
  for (const [x, y] of neighbours) {
    if (grid[x][y] == -1) {
      const temp = grid[x][y];
      grid[x][y] = grid[i][j];
      grid[i][j] = temp;
    }
  }
}

function isSolved() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const img = grid[i][j];
      if (img != -1) {
        if (img.props.i != i && img.props.j != j) return false;
      }
      if (i == cols - 1 && j == rows - 1 && img == -1) {
        return true;
      }
    }
  }
  return false;
}
function draw() {
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      rect(x, y, w, h);
      const img = grid[i][j];
      if (img != -1) {
        image(img, x, y);
      }
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      strokeWeight(2);
      noFill();
      rect(x, y, w, h);
    }
  }
}