class Shot {
  constructor(from, to) {
    this.x = from.x;
    this.y = from.y;

    // Think this needs a bit of trigonometry
    // to figure out. But keep as is for now.
    this.changeInX = (to.x - from.x) / 10;
    this.changeInY = (to.y - from.y) / 10;

    // this.endAt = new Date().getTime() + 2000;
  }

  move() {
    this.x += this.changeInX;
    this.y += this.changeInY;
  }
}
