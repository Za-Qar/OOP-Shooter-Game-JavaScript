const gameOptions = {
  players: [
    new Player(
      100,
      { x: 300, y: 100, width: 100, height: 141 },
      "images/Artboard0.png",
      true
    ),
    new Player2(
      100,
      { x: 600, y: 200, width: 100, height: 141 },
      "images/player2.png"
    ),
  ],
  // player: new Player(100, { x: 300, y: 100, width: 100, height: 141 }),
  // player2: new Player2(100, { x: 600, y: 200, width: 100, height: 141 }),

  world: new World(400, 500),
  obstacles: [
    new Obstacle(200, { x: 200, y: 200, height: 50, width: 50 }),
    new Obstacle(200, { x: 300, y: 300, height: 50, width: 50 }),
    new Obstacle(200, { x: 600, y: 400, height: 70, width: 90 }),
  ],
};
