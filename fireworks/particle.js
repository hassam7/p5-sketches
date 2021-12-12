class Particle {
  constructor(x, y, hu, fireworks = false) {
    this.position = createVector(x, y);
    this.fireworks = fireworks;
    this.hu = hu;
    this.lifespan = 255;
    if (this.fireworks) {
      this.vel = createVector(0, random(-12, -8));
    } else {
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(1, 6));
    }
    this.acc = createVector(0, 0);
  }
  update() {
    if (!this.fireworks) {
      this.vel.mult(0.85);
      this.lifespan -= 2;
    }
    this.vel.add(this.acc);
    this.position.add(this.vel);
    this.acc.mult(0);
  }
  applyForce(force) {
    this.acc.add(force);
  }
  show() {
    colorMode(HSB);

    if (!this.fireworks) {
      strokeWeight(2);
      stroke(this.hu, 255, 255, this.lifespan);
    } else {
      strokeWeight(4);
      stroke(this.hu, 255, 255);
    }
    point(this.position.x, this.position.y);
  }

  done() {
    return this.lifespan < 0;
  }
}
