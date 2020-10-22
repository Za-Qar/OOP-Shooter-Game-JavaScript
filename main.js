const gameOptions = {
  players: [
    // Player
    new Player(100, { x: 300, y: 100 }),

    // Computer
    // new Player(100, { x: 0, y: 0 }),
  ],
  world: new World(400, 500),
  obstacles: [
    // table
    new Obstacle({ x: 50, y: 50 }),
    // table2
    new Obstacle({ x: 100, y: 150 }),
  ],
};

const game = new Game(gameOptions);
// game.start();

// https://stackoverflow.com/a/12444641
const handler = (e) => {
  if (
    !/^Key[WASD]$/.test(e.code) &&
    !/^Arrow(Up|Left|Right|Down)$/.test(e.code)
  ) {
    return;
  }
  keysPressed[e.code] = e.type === "keydown";
};

window.addEventListener("keydown", handler);
window.addEventListener("keyup", handler);

const clickHandler = (e) => {
  console.log(e);
  ctx.fillStyle = '#EBEBEB';
  ctx.fillRect(e.clientX , e.clientY , 50, 50);

  game.players[0].fire({x: e.clientX, y:e.clientY})
  
}

canvas.addEventListener("click", clickHandler);
//Later: OnMouseDown provide automatic fire
