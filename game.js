const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

class Game {
  constructor({ players, world, obstacles }) {
    this.players = players;
    this.world = world;
    this.obstacles = obstacles;
  }

  start() {
    // Update models (account for all collisions)
    // Then loop over each item and ask it to draw itself.

    for (const player of this.players) {
      player.move();
      const currentTime = new Date().getTime();

      player.shotsFired = player.shotsFired.filter(
        (s) => s.endAt > currentTime
      );

      for (const shot of player.shotsFired) {
        shot.move();
      }
    }

    //Canvas Start -------------------------------------------

    canvas.height = 1080;
    canvas.width = 1920;

    //The room wall
    ctx.fillStyle = "#EBEBEB";
    ctx.fillRect(0, 0, canvas.width, canvas.height / 3.5);
    // ctx.strokeStyle = "black";
    // ctx.lineWidth = 5;
    // ctx.stroke()

    //Room floor
    ctx.fillStyle = "#D1D1D1";
    ctx.fillRect(0, canvas.height / 3.5, canvas.width, canvas.height);

    //Door
    ctx.fillStyle = "brown";
    ctx.fillRect(1500, 90, 190, 280);

    //Door handle
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
    for (const obstacle of this.obstacles) {
      ctx.fillStyle = "#704300";
      ctx.fillRect(obstacle.x, obstacle.y, 150, 300);
    }

    // Draw players
    for (const player of this.players) {
      // Need unique colour for each player.
      ctx.fillStyle = "rgba(100, 100, 230, 0.5)";
      ctx.fillRect(player.x, this.world.height - player.y, 100, 100); // Should not be 10, 10 -- but instead use instance's state.
      ctx.font = "30px Arial";
      ctx.fillText(`HP ${player.health}`, player.x, canvas.height - player.y - 700);
      for (const shot of player.shotsFired) {
        console.log("About to render bullet");
        ctx.fillStyle = "red";
        ctx.fillRect(shot.to.x, shot.to.y, 50, 50);
      }
    }

    

    // Draw obstacles
    for (const obstacle of this.obstacles) {
      ctx.fillStyle = "rgba(50, 50, 40, 0.3)";
      ctx.fillRect(obstacle.x, obstacle.y, 40, 40);
      ctx.font = "30px Arial";
      ctx.fillText(`HP ${obstacle.health}`, obstacle.x + 35, obstacle.y - 10);
    }

    if (new Date().getTime() >= tenSeconds) {
      // return;
    }

    //Bullet
    requestAnimationFrame(this.start.bind(this));

    // render the world with every loop
  }
}

const tenSeconds = new Date().getTime() + 36000;
