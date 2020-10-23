class Player2 extends Player {
  constructor(health, { x, y, height, width }, imageSrc) {
    super(
      health,
      { x, y, height, width, changeInX: 10, changeInY: 10 },
      imageSrc,
      false
    );
    this.lastFiredAt = new Date().getTime();
  }
  moveBy(changeInX, changeInY) {
    super.moveBy(changeInX, changeInY);
    if (changeInX === 0 && changeInY === 0) {
      this.imageSrc = "images/player2.png";
    } else {
      this.imageSrc = "images/player2_move.png";
    }
  }

  get shouldFire() {
    return new Date().getTime() > this.lastFiredAt + 1000;
  }

  fire(to) {
    if (this.shouldFire) {
      this.lastFiredAt = new Date().getTime();
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
  }
}
