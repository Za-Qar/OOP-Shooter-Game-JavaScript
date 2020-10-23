class Player2 extends Player{
    constructor(health, { x, y, height, width }, imageSrc) {
        super(health, { x, y, height, width, changeInX: 10, changeInY: 10 }, imageSrc);
    }
      moveBy(changeInX, changeInY) {
        super.moveBy(changeInX, changeInY);
        if (changeInX === 0 && changeInY === 0) {
          this.imageSrc = "images/player2.png";
        } else {
          this.imageSrc = "images/player2_move.png";
        }
      }
}
