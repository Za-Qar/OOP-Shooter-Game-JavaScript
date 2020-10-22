class Shot {
  constructor(from, to) {
    this.x = from.x;
    this.y = from.y;
    this.to = to;
    this.endAt = new Date().getTime() + 2000;
    // console.log(to);

    // this.changeInX = (to.x - this.x) / this.speed;
    // this.changeInY = (to.y - this.y) / this.speed;
    // console.log(this.changeInX, this.changeInY);
  }

  move() {
    // this.x += this.changeInX;
    // this.y += this.changeInY;
  }
}
