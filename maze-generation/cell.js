class Cell {
  constructor(x, y, rows, cols, grid) {
    this.x = x;
    this.y = y;
    this.rows = rows;
    this.cols = cols;
    this.grid = grid;
    this.walls = new Array(4).fill(true);
    this.visited = false;
    this.validOptions = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
    ];
    console.log(x, y);
  }

  draw() {
    stroke(255);
    const x = this.x * spacing;
    const y = this.y * spacing;
    const [top, right, bottom, left] = this.walls;
    if (top) {
      line(x, y, x + spacing, y); // top wall
    }
    if (right) {
      line(x + spacing, y, x + spacing, y + spacing); // right wall
    }
    if (bottom) {
      line(x, y + spacing, x + spacing, y + spacing); // bottom wall
    }
    if (left) {
      line(x, y, x, y + spacing); // left wall
    }
    if (this.visited) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, spacing, spacing);
    }
  }

  isInBounds(x, y) {
    if (x < 0 || x > this.rows - 1 || y < 0 || y > this.cols - 1) {
      return false;
    }
    return true;
  }

  getNeighbours() {
    let neighbours = [];
    for (let { dx, dy } of this.validOptions) {
      const newDx = this.x + dx;
      const newDy = this.y + dy;
      if (this.isInBounds(newDx, newDy)) {
        const neighbour = this.grid[newDx][newDy];
        if (!neighbour.visited) {
          neighbours.push(neighbour);
        }
      }
    }

    if (neighbours.length) {
      const randomNeighbour = random(neighbours);
      return randomNeighbour;
    } else {
      return undefined;
    }
  }

  highlight() {
    let x = this.x * spacing;
    let y = this.y * spacing;
    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, spacing);
  }
}
