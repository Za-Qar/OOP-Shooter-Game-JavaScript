const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

class Game {
  constructor({ player, world, obstacles }) {
    this.player = player;
    this.world = world;
    this.obstacles = obstacles;
    this.keysPressed = {};

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

  start() {
    // Update models (account for all collisions)
    // Then loop over each item and ask it to draw itself.

    const player = this.player;

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

    // collision detection: between player and obstacle

    /*

Say you have Rect A, and Rect B. Proof is by contradiction. Any one of four conditions guarantees that no overlap can exist:

Cond1. If A's left edge is to the right of the B's right edge, - then A is Totally to right Of B
Cond2. If A's right edge is to the left of the B's left edge, - then A is Totally to left Of B
Cond3. If A's top edge is below B's bottom edge, - then A is Totally below B
Cond4. If A's bottom edge is above B's top edge, - then A is Totally above B
    */

    
    if (
      this.obstacles.some((o) => {
        // player bottom vs obstacle top

        // if (player.y + player.height > o.y) {
        //   console.log("player is below object");
        // }
        // if (player.x + player.width > o.x) {
        //   console.log("player is to the right of object");
        // }
        // if (player.y < o.y + o.height) {
        //   console.log("player is above object");
        // }


        // if ((player.x + player.width)>=(o.x) + (player.x)<=(o.X + o.width)&&(player.y + player.health) >= (o.y) && (player.y)<=(o.y + o.height)){
        //   console.log("collision occured")
        // }

        // if (player.y < o.y + o.height) {
        //   console.log("player is above object");
        // }

        // if player right edge hits obstacle left edge
        // const c =
        //   player.x + player.width > o.x ||
        //   // if player left edge hits obstacle right edge
        //   player.x < o.x + o.width ||
        //   // if player top edge hits obstacle bottom edge
        //   player.y < o.y + o.height ||
        //   // if player bottom edge hits obstacle top edge
        //   player.y + player.height > o.y;
        // if player bottom edge hits obstacle top edge
        // ctx.fillRect(player.x, player.y, player.width, player.height);
        // console.log("Collision happened?", o);
      })
    ) {
      // some logic
    }
    // if obstacle not in way
    player.moveBy(changeInX, changeInY);
    // player.move();

    for (const shot of player.shotsFired) {
      shot.move();
    }

    //Canvas Start -------------------------------------------

    canvas.height = 500;
    canvas.width = 500;

    //The room wall
    ctx.fillStyle = "#EBEBEB";
    ctx.fillRect(0, 0, canvas.width, canvas.height / 3.5);
    // ctx.strokeStyle = "black";
    // ctx.lineWidth = 5;
    // ctx.stroke()

    //Room floor
    // ctx.fillStyle = "#D1D1D1";
    // ctx.fillRect(0, canvas.height / 3.5, canvas.width, canvas.height);

    //Door
    // ctx.fillStyle = "brown";
    // ctx.fillRect(1500, 90, 190, 280);

    // //Door handle
    // ctx.beginPath();
    // ctx.arc(1650, 240, 11, 0, Math.PI * 2, false);
    // ctx.fillStyle = "black";
    // ctx.fill();
    // ctx.closePath();

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

    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, 2, 2);

    ctx.fillStyle = "orange";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    let img = new Image();
    img.src = player.imageSrc;
    ctx.drawImage(img, player.x, player.y, player.width, player.height);

    // Player HP
    ctx.fillStyle = player.health > 50 ? "green" : "red";
    ctx.font = "30px Arial";
    ctx.fillText(`HP ${player.health}`, player.x, player.y - 20);

    for (const shot of player.shotsFired) {
      ctx.fillStyle = "goldenrod";
      ctx.fillRect(shot.x, shot.y, 10, 10);
    }

    // Draw obstacles
    for (const obstacle of this.obstacles) {
      ctx.fillStyle = "rgba(50, 50, 40, 0.3)";
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      ctx.font = "30px Arial";
      ctx.fillText(`HP ${obstacle.health}`, obstacle.x + 35, obstacle.y - 10);
    }

    requestAnimationFrame(this.start.bind(this));

    // render the world with every loop
  }
}

const tenSeconds = new Date().getTime() + 36000;
