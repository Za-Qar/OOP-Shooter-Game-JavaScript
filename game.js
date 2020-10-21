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
    }

    const canvas = document.querySelector("canvas");
    canvas.width = canvas.height = 500;
    const ctx = canvas.getContext("2d");

    // Draw world/background
    ctx.fillStyle = "rgba(120, 120, 55, 0.6)";
    ctx.fillRect(0, 0, this.world.width, this.world.height);

    // Draw players
    for (const player of this.players) {
      // Need unique colour for each player.
      ctx.fillStyle = "rgba(100, 100, 230, 0.5)";
      ctx.fillRect(player.x, this.world.height - player.y, 10, 10); // Should not be 10, 10 -- but instead use instance's state.
    }

    // Draw obstacles
    for (const obstacle of this.obstacles) {
      ctx.fillStyle = "rgba(50, 50, 40, 0.3)";
      ctx.fillRect(obstacle.x, obstacle.y, 40, 40);
    }

    console.log("rendered");

    requestAnimationFrame(this.start.bind(this));

    // render the world with every loop
    const inTenSeconds = new Date().getTime() + 36000;

    // while (new Date().getTime() < inTenSeconds) {}
  }
}
