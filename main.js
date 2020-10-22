const gameOptions = {
  player:
    // Player
    new Player(100, { x: 300, y: 100, width: 100, height: 141 }),

  // Computer
  // new Player(100, { x: 0, y: 0 }),

  world: new World(400, 500),
  obstacles: [
    // table
    new Obstacle(50, { x: 200, y: 200, height: 50, width: 50 }),
    // table2
    new Obstacle(50, { x: 300, y: 300, height: 50, width: 50 }),
  ],
};

const game = new Game(gameOptions);
game.start();

// const clickHandler = (e) => {
//   // produce the shot
//   game.players[0].fire({ x: e.x, y: e.y });
// };

// canvas.addEventListener("click", clickHandler);
