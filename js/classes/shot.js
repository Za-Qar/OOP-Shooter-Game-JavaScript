class Shot extends MovableThing {
  constructor({ from, to, height, width, owner }) {
    super({
      x: from.x,
      y: from.y,
      height,
      width,
      changeInX: (to.x - from.x) / 10,
      changeInY: (to.y - from.y) / 10,
    });
    this.owner = owner;
  }

  move() {
    this.x += this.changeInX;
    this.y += this.changeInY;
  }
}
