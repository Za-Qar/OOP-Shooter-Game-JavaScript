class Thing {
  constructor({ x, y, height, width }) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  /**
   * Should return a boolean indicating whether this thing collides with the other thing.
   * @param {Thing} otherThing
   */
  collidesWith(otherThing) {
    return (
      this.topLeft.x < otherThing.bottomRight.x &&
      this.bottomRight.x > otherThing.topLeft.x &&
      this.topLeft.y < otherThing.bottomRight.y &&
      this.bottomRight.y > otherThing.topRight.y
    );
  }

  /**
   * Should return a boolean indicating whether any part of this thing is outside
   * of the other thing.
   * @param {Thing} otherThing
   */
  extendsBeyond(otherThing) {
    return (
      this.topLeft.x < otherThing.topLeft.x ||
      this.bottomRight.x > otherThing.bottomRight.x ||
      this.topLeft.y < otherThing.topLeft.y ||
      this.bottomRight.y > otherThing.bottomRight.y
    );
  }

  /**
   * Should return co-ordinates of top-left.
   */
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
