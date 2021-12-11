let width = 400;
let height = 400;
let rows, cols;
let spacing = 20;
let grid = [];
const stack = [];
let currentSpot;
let i = 0;
const make2DArray = (rows, cols) => {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
};
function setup() {
  rows = floor(height / spacing);
  cols = floor(width / spacing);
  console.log("Rows: ", rows, " Cols: ", cols);
  grid = make2DArray(rows, cols);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid[y][x] = new Cell(y, x, rows, cols, grid);
    }
  }
  createCanvas(500, 500);
  background(51);
  translate(50, 50);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = grid[y][x];
      cell.draw();
    }
  }
  currentSpot = grid[0][0];
  currentSpot.draw();
  currentSpot.visited = true;
}

function draw() {
  // frameRate(1);
  background(51);
  translate(50, 50);
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      const cell = grid[y][x];
      cell.draw();
    }
  }
  currentSpot.highlight();
  const next = currentSpot.getNeighbours();
  if (next) {
    stack.push(currentSpot);
    next.visited = true;
    removeWalls(currentSpot, next);

    currentSpot = next;
  } else if (stack.length) {
    currentSpot = stack.pop();
  }
}

function removeWalls(a, b) {
  var x = a.x - b.x;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.y - b.y;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
