class Firework {
  constructor() {
    this.hu = random(255);
    this.firework = new Particle(random(width), height, this.hu, true);
    this.exploded = false;
    this.particles = [];
  }
  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.applyForce(gravity);
      particle.update();
      if (particle.done()) {
        this.particles.splice(i, 1);
      }
    }
  }
  explode() {
    for (let i = 0; i < 100; i++) {
      const p = new Particle(
        this.firework.position.x,
        this.firework.position.y,
        this.hu,
        false
      );
      this.particles.push(p);
    }
  }
  show() {
    if (!this.exploded) {
      this.firework.show();
    }
    this.particles.forEach((particle) => {
      particle.show();
    });
  }

  done() {
    return this.exploded && this.particles.length == 0;
  }
}
