class Player {
  constructor(health, { x, y, height, width }) {
    this.health = health;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.changeInX = 20;
    this.changeInY = 20;
    this.shotsFired = [];

    this.imageSrc = "images/Artboard0.png";

    // Listen for mouse events
    canvas.addEventListener("click", (e) => {
      this.fire({ x: e.x, y: e.y });
    });
  }

  get quickCoordinates() {
    // Getter for left-most, right-most, top-most, bottom-most coordinates.
  }

  get fullCoordinates() {
    // Produce an array of coordinates outlining the space that
    // player occupies at any given moment in time
  }

  move() {
    // this.moveBy(changeInX, changeInY);
  }

  moveBy(changeInX, changeInY) {
    if (changeInX === 0 && changeInY === 0) {
      this.imageSrc = "images/Artboard0.png";
    } else {
      this.imageSrc = "images/Artboard1.png";
    }
    this.x += changeInX;
    this.y += changeInY;
  }

  onInput(e) {}

  fire({ x, y }) {
    const shot = new Shot({ x: this.x + 20, y: this.y + 30 }, { x, y });
    this.shotsFired.push(shot);
  }

  onBulletCollision() {
    // this.health--;
  }
}
