class Shot {
  constructor(from, to) {
    this.speed = 10;
    this.x = from.x;
    this.y = from.y;
    this.changeInX = (to.x - this.x) / this.speed;
    this.changeInY = (to.y - this.y) / this.speed;
  }

  move() {
    this.x += this.changeInX;
    this.y += this.changeInY;
  }

  
}
