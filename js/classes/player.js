class Player extends MovableThing {
  constructor(health, { x, y, height, width }, imageSrc, onMouseClick) {
    super({ x, y, height, width, changeInX: 10, changeInY: 10 });

    this.health = health;
    // this.changeInX = 1;
    // this.changeInY = 1;
    this.shotsFired = [];

    this.imageSrc = imageSrc; //;

    if (onMouseClick) {
      canvas.addEventListener("click", (e) => {
        this.fire({ x: e.x, y: e.y });
      });
    }
    // Listen for mouse events
  }

  moveBy(changeInX, changeInY) {
    super.moveBy(changeInX, changeInY);
    if (changeInX === 0 && changeInY === 0) {
      this.imageSrc = "images/Artboard0.png";
    } else {
      this.imageSrc = "images/Artboard1.png";
    }
  }

  fire(to) {
    console.log("Fired at", to);
    const shot = new Shot({
      // Magic numbers are to make shot "appear" to come from weapons.
      from: {
        x: this.x + 80,
        y: this.y + 40,
      },
      to,
      height: 5,
      width: 5,
      owner: this,
    });
    this.shotsFired.push(shot);
  }

  removeShot(shotToRemove) {
    this.shotsFired = this.shotsFired((shot) => shot !== shotToRemove);
  }
}
