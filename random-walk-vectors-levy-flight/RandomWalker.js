class RandomWalker {
  constructor({ initialPosition, width, height, color = "orange" }) {
    this.position = initialPosition;
    this.prevPosition = initialPosition.copy();
    this.width = width;
    this.height = height;
    this.color = color;
  }

  walk() {
    const pos = this.position;
    const prev = this.prevPosition;
    stroke(this.color);
    line(pos.x, pos.y, prev.x, prev.y);
    const step = p5.Vector.random2D();
    const r = random(100);
    if (r < 15) {
      step.mult(random(25, 100));
    } else {
      step.setMag(10);
    }
    const temp = pos.copy().add(step);
    if (
      temp.x > this.width ||
      temp.x < 0 ||
      temp.y > this.height ||
      temp.y < 0
    ) {
      return;
    }
    prev.set(pos.copy());
    // if (aboutToJump) circle(temp.x, temp.y, 20);
    pos.add(step);
  }
}
