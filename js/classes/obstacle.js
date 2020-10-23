class Obstacle extends Thing {
  constructor(health, { x, y, height, width }) {
    super({ x, y, height, width });
    this.health = health;
  }

  get topLeft() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  get topRight() {
    return {
      x: this.x + this.width,
      y: this.y,
    };
  }

  get bottomLeft() {
    return {
      x: this.x,
      y: this.y + this.height,
    };
  }

  get bottomRight() {
    return {
      x: this.x + this.width,
      y: this.y + this.height,
    };
  }
}
