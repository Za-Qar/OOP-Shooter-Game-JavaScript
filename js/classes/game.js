const canvas = document.querySelector("canvas");
// const ctx = canvas.getContext("2d");

class Game {
  /**
   *
   * @param {{player: Player, world: World, obstacles: Obstacle[]}} gameOptions
   */
  constructor({ players, world, obstacles }) {
    this.players = players;
    this.world = world;
    this.obstacles = obstacles;
    this.keysPressed = {};

    canvas.height = this.world.height;
    canvas.width = this.world.width;

    this.ctx = canvas.getContext("2d");

    // https://stackoverflow.com/a/12444641
    const onInput = (e) => {
      if (!/^Key[WASD]$/.test(e.code)) {
        return;
      }
      this.keysPressed[e.code] = e.type === "keydown";
    };

    // Listen for keyboard input
    window.addEventListener("keydown", onInput);
    window.addEventListener("keyup", onInput);
  }

  /**
   * Should update all data. Shouldn't render anything in this function.
   */
  updateModel() {
    const player = this.players[0];
    const player2 = this.players[1];

    let changeInY;
    if (this.keysPressed.KeyW) {
      changeInY = -player.changeInY;
    } else if (this.keysPressed.KeyS) {
      changeInY = player.changeInY;
    } else {
      changeInY = 0;
    }

    let changeInX;
    if (this.keysPressed.KeyD) {
      changeInX = player.changeInX;
    } else if (this.keysPressed.KeyA) {
      changeInX = -player.changeInX;
    } else {
      changeInX = 0;
    }

    player.moveBy(changeInX, changeInY);
    // player.health = Math.max(player.health - 0.1, 0);

    if (
      // player has gone outside world/map?
      player.extendsBeyond(this.world) ||
      // player collides with some obstable?
      this.obstacles.some((obstacle) => player.collidesWith(obstacle))
    ) {
      // move the player back.
      player.moveBy(-changeInX, -changeInY);
    }

    changeInX = (Math.random() > 0.5 ? 1 : -1) * 10;
    changeInY = (Math.random() > 0.5 ? 1 : -1) * 10;

    player2.moveBy(changeInX, changeInY);

    if (
      // player has gone outside world/map?
      player2.extendsBeyond(this.world) ||
      // player collides with some obstable?
      this.obstacles.some((obstacle) => player2.collidesWith(obstacle))
    ) {
      // move the player back.
      player2.moveBy(-changeInX, -changeInY);
    }


    // move shots
    for (const shot of player.shotsFired) {
      shot.move();
    }

    // TODO: This shouldn't happen. Expose a method to improve this.
    player.shotsFired = player.shotsFired.filter((shot) =>
      shot.collidesWith(this.world)
    );
    player.shotsFired = player.shotsFired.filter((shot) => {
      // shot has hit at least one object
      return !this.obstacles.some((obstacle) => {
        if (shot.collidesWith(obstacle)) {
          obstacle.health = Math.max(obstacle.health - 10, 0);
          return true;
        }
        return false;
      });
    });
  }

  start() {
    this.updateModel();

    const ctx = this.ctx;
    const player = this.players[0];
    const player2 = this.players[1];

    //Canvas Start -------------------------------------------

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //The room wall
    ctx.fillStyle = "#EBEBEB"; // Think #bfacac might be better colour.
    ctx.fillRect(0, 0, canvas.width, canvas.height / 3.5);
    // ctx.strokeStyle = "black";
    // ctx.lineWidth = 5;
    // ctx.stroke()

    //Room floor
    ctx.fillStyle = "#D1D1D1";
    ctx.fillRect(0, canvas.height / 3.5, canvas.width, canvas.height);

    //Door
    ctx.fillStyle = "brown";
    ctx.fillRect(canvas.width * 0.8, 0, 80, canvas.height / 3.5);

    // //Door handle
    ctx.beginPath();
    ctx.arc(1650, 240, 11, 0, Math.PI * 2, false);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    //Table
    // ctx.fillStyle = "#704300";
    // ctx.fillRect(1200, 500, 150, 300);

    // ctx.fillStyle = "#503000";
    // ctx.fillRect(1200, 800, 25, 90);

    // ctx.fillStyle = "#503000";
    // ctx.fillRect(1325, 800, 25, 90);

    //Closet
    // ctx.fillStyle = "#704300";
    // ctx.fillRect(750, 850, 200, 100);

    // ctx.fillStyle = "#503000";
    // ctx.fillRect(750, 950, 100, 150);

    // ctx.fillStyle = "#503000";
    // ctx.fillRect(850, 950, 100, 150);

    // ctx.beginPath();
    // ctx.moveTo(848, 950);
    // ctx.lineTo(848, 1100);
    // ctx.stroke();
    // ctx.closePath();

    //Door hands
    // ctx.fillStyle = "black";
    // ctx.fillRect(825, 1000, 10, 30);
    // ctx.fillStyle = "gray";
    // ctx.fillRect(825, 990, 10, 10);

    // ctx.fillStyle = "black";
    // ctx.fillRect(860, 1000, 10, 30);
    // ctx.fillStyle = "gray";
    // ctx.fillRect(860, 990, 10, 10);

    //Canvas End -----------

    // Draw obstacles
    // for (const obstacle of this.obstacles) {
    //   ctx.fillStyle = "#704300";
    //   ctx.fillRect(obstacle.x, obstacle.y, 20, 20);
    // }

    // Draw players

    // Need unique colour for each player.
    // ctx.fillStyle = "red";
    // ctx.fillRect(player.x, player.y, 2, 2);

    // Background orange container (around player) for debugging.
    // ctx.fillStyle = "orange";
    // ctx.fillRect(player.x, player.y, player.width, player.height);

    // Small corner squares for debugging.
    // ctx.fillStyle = "black";
    // ctx.fillRect(player.topLeft.x, player.topLeft.y, 5, 5);
    // ctx.fillRect(player.topRight.x, player.topRight.y, 5, 5);
    // ctx.fillRect(player.bottomLeft.x, player.bottomLeft.y, 5, 5);
    // ctx.fillRect(player.bottomRight.x, player.bottomRight.y, 5, 5);

    // Draw obstacles
    for (const obstacle of this.obstacles) {
      ctx.fillStyle = "#704300";
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

      // Obstacle HP bar
      ctx.fillStyle =
        obstacle.health > 120
          ? "green"
          : obstacle.health > 80
          ? "yellow"
          : "red";
      ctx.fillRect(
        obstacle.x,
        obstacle.y - 40,
        (obstacle.health / 200) * obstacle.width,
        20
      );
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.strokeRect(obstacle.x, obstacle.y - 40, obstacle.width, 20);
    }

    for (const player of this.players) {
      // Player sprite
      let img = new Image();
      img.src = player.imageSrc;
      ctx.drawImage(img, player.x, player.y, player.width, player.height);

      // Player HP bar
      ctx.fillStyle =
        player.health > 60 ? "green" : player.health > 40 ? "yellow" : "red";
      ctx.fillRect(
        player.x,
        player.y - 20,
        (player.health / 100) * player.width,
        20
      );
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.strokeRect(player.x, player.y - 20, player.width, 20);

      for (const shot of player.shotsFired) {
        ctx.fillStyle = "goldenrod";
        ctx.fillRect(shot.x, shot.y, 7, 7);
      }
    }

    requestAnimationFrame(this.start.bind(this));
  }
}
