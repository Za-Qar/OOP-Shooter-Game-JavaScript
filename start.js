const startButton = document.querySelector("#start-button");
const replayButton = document.querySelector("#replay-button");
const startScreen = document.querySelector("#start");

const endScreen = document.querySelector("#end");
const result = document.querySelector("#result");
const canvasShow = document.querySelector("#draw-here");

function startGame() {
  startScreen.classList.toggle("hidden");
  canvasShow.classList.toggle("hidden");
  const game = new Game(gameOptions);
  game.start();
}

startButton.addEventListener("click", startGame);
replayButton.addEventListener("click", () => {
  window.location.reload();
});
