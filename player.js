class Player {
  constructor(health, { x, y }) {
    this.health = health;
    this.x = x;
    this.y = y;
    this.changeInX = 20;
    this.changeInY = 20;
    this.shotsFired = [];
  }

  get quickCoordinates() {
    // Getter for left-most, right-most, top-most, bottom-most coordinates.
  }

  get fullCoordinates() {
    // Produce an array of coordinates outlining the space that
    // player occupies at any given moment in time
  }

  move() {
    // const changeInY =
    //   keysPressed.KeyW || keysPressed.ArrowUp
    //     ? this.changeInY
    //     : keysPressed.KeyS || keysPressed.ArrowDown
    //     ? -this.changeInY
    //     : 0;
    let changeInX;
    let changeInY;
    if (keysPressed.KeyW || keysPressed.ArrowUp) {
      changeInY = this.changeInY;
    } else if (keysPressed.KeyS || keysPressed.ArrowDown) {
      changeInY = -this.changeInY;
    } else {
      changeInY = 0;
    }

    // const changeInX =
    //   keysPressed.KeyA || keysPressed.ArrowLeft
    //     ? -this.changeInX
    //     : keysPressed.KeyD || keysPressed.ArrowRight
    //     ? this.changeInX
    //     : 0;
    if (keysPressed.KeyD || keysPressed.ArrowLeft) {
      changeInX = this.changeInX;
    } else if (keysPressed.KeyA || keysPressed.ArrowRight) {
      changeInX = -this.changeInX;
    } else {
      changeInX = 0;
    }

    this.moveBy(changeInX, changeInY);
  }

  moveInDirection(direction) {
    switch (direction) {
      case directions.UP:
        return this.moveBy(0, this.changeInY);
      case directions.DOWN:
        return this.moveBy(0, -this.changeInY);
      case directions.LEFT:
        return this.moveBy(-this.changeInX, 0);
      case directions.RIGHT:
        return this.moveBy(this.changeInX, 0);
      case directions.UP_LEFT:
        return this.moveBy(this.changeInX, -this.changeInY);
      case directions.UP_RIGHT:
        return this.moveBy(this.changeInX, this.changeInY);
      default:
        throw new Error(`Unexpected direction = ${direction}`);
    }
  }

  moveBy(changeInX, changeInY) {
    // console.log("Moving by", { changeInX, changeInY });
    this.x += changeInX;
    this.y += changeInY;
    // console.log("Moved to", { x: this.x, y: this.y });
  }

  fire({ x, y }) {
    const shot = new Shot({ x: this.x, y: this.y }, { x, y });
    this.shotsFired.push(shot);
    // console.log(shot);
    // console.log(this.shotsFired);
  }

  onBulletCollision() {
    this.health--;
  }

}

const keysPressed = {};

const directions = {
  UP: "UP",
  DOWN: "DOWN",
  RIGHT: "RIGHT",
  LEFT: "LEFT",
  UP_LEFT: "UP_LEFT",
  UP_RIGHT: "UP_RIGHT",
  DOWN_LEFT: "DOWN_LEFT",
  DOWN_RIGHT: "DOWN_RIGHT",
};
