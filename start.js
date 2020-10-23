const startButton = document.querySelector("#start-button");
const endButton = document.querySelector("#end-button");
const startScreen = document.querySelector("#start");

const endScreen = document.querySelector("#end-screen");
const canvasShow = document.querySelector("#draw-here");

function startGame(){
  startScreen.classList.toggle("hidden");
  canvasShow.classList.toggle("hidden");
  const game = new Game(gameOptions);
  game.start();
}

startButton.addEventListener("click", startGame)