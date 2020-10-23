class MovableThing extends Thing {
  constructor({ x, y, height, width, changeInX, changeInY }) {
    super({ x, y, height, width });
    this.changeInX = changeInX;
    this.changeInY = changeInY;
  }

  set xVelocity(newChangeInX) {
    this.changeInX = newChangeInX;
  }

  set yVelocity(newChangeInY) {
    this.changeInY = newChangeInY;
  }

  moveBy(changeInX, changeInY) {
    this.x += changeInX;
    this.y += changeInY;
  }

  move() {
    this.x += this.changeInX;
    this.y += this.changeInY;
  }
}
