// rocks! papers!! scissors!!!
// Rainn Morphy
// September 25th, 2024 / Nov 17th, 2024

// ref

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
// https://github.com/Jordan514/rock_paper_scissors/blob/main/script.js
// https://www.reddit.com/r/learnjavascript/comments/1cla2el/rock_paper_scissors_a_more_efficient_way/


const PLAYER_CHOICES = ["rocks", "papers", "scissors"];
const ENEMY_CHOICES = structuredClone(PLAYER_CHOICES);

let gameState = "title";

let playerScore, enemyScore;

let bgMusic;

let startButton;

let player, enemy, referee;

// implement p5.palette?
const PALETTE = { // for consistent colors, and ease of use
  BG: [5, 0, 32],
};

let rocks, papers, scissors;
let playerTurn = true;

let sideSwitch = ["LEFT", "RIGHT"];
let selection = 0;
let randNum;


function preload() {
  soundFormats("mp3"); // setting the sound format
  bgMusic = loadSound("assets/sounds/bgMusic.mp3"); // Loads Background Music (Music is 'Tentacular Circus' from the Splatoon Series)

  startButton = loadImage("assets/graphics/startButton.gif"); // Loads the Start Button animation for title screen

  player = loadImage("assets/graphics/player.png"); // Loads the player graphic for title screen
  enemy = loadImage("assets/graphics/enemy.png"); // Loads the enemy graphic for title screen
  referee = loadImage("assets/graphics/referee.png"); // Loads the referee graphic for later
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(PALETTE.BG);

  if (gameState === 'game') {
    battleScreen();
    rpsPlayerMove();
    rpsLogic();
  }
  else {
    titleScreen();
  }
  
}

function mousePressed() {
  if (!bgMusic.isPlaying()) {
    backgroundMusic(); // Calls the Background Music function
  }
  else if (gameState === "title" && bgMusic.isPlaying()) {
    gameState = "game";
  }
}

function backgroundMusic() {
  bgMusic.play();
  bgMusic.loop();
  bgMusic.amp(0.3);
}

function titleScreen() {
  image(startButton, width / 1.6, height / 2.5); //centers start button vertically, and aligns to the right horizontally
  rotate(-0.35);
  image(player, width / -8, height / 1.15, player.width * 1.6, player.height * 1.6); // semi-centers horizontally, and aligns to the bottom
  rotate(3.15);
  image(enemy, width / -1.13, height / -1.45, enemy.width * 1.6, enemy.height * 1.6); // semi-centers horizontally, and aligns to the top
}

function battleScreen() {
  playerTurn = true;

  image(player, width / 4, height / 2, player.width, player.height);

}
function rpsPlayerMove() {
  if (rocks === true) {
    fill(255);
    textAlign(sideSwitch[selection]);
    text(PLAYER_CHOICES[0], width / 4, height / 2);
    playerTurn = false;
    rpsEnemyMove();
  }
  else if (papers === true) {
    fill(255);
    textAlign(sideSwitch[selection]);
    text(PLAYER_CHOICES[1], width / 4, height / 2);
    playerTurn = false;
    rpsEnemyMove();
  }
  else if (scissors === true) {
    fill(255);
    textAlign(sideSwitch[selection]);
    text(PLAYER_CHOICES[2], width / 4, height / 2);
    playerTurn = false;
    rpsEnemyMove();
  }
}

function rpsEnemyMove() {
  text(PLAYER_CHOICES[randNum], width / 2, height / 2);
  console.log(randNum);
}

function keyTyped() {
  if (!bgMusic.isPlaying()) {
    backgroundMusic(); // Calls the Background Music function
  }
  else if (gameState === "title" && bgMusic.isPlaying()) {
    gameState = "game";
  }
  else if (playerTurn === true) {
    rocks = false;
    papers = false;
    scissors = false;
    randNum = Math.round(random(0, 2));
    // rpsEnemyMove();
    if (keyCode === 49) {
      rocks = true;
    }
    else if (keyCode === 50) {
      papers = true;
    }
    else if (keyCode === 51) {
      scissors = true;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function rpsLogic(player, enemy) {
  if (rocks === true && randNum === 0) {
    text("rocktie", width / 2, height / 4);
  }
  else if (papers === true && randNum === 1) {
    text("papertie", width / 2, height / 4);
  }
  else if (scissors === true && randNum === 2) {
    text("scissorstie", width / 2, height / 4);
  }
  else if (rocks === true && randNum === 1) {
    text("p2 paperwin", width / 2, height / 4);
  }
  else if (rocks === true && randNum === 2) {
    text("p1 rockwin", width / 2, height / 4);
  }
  else if (papers === true && randNum === 0) {
    text("p1 paperwin", width / 2, height / 4);
  }
  else if (papers === true && randNum === 2) {
    text("p2 scissorwin", width / 2, height / 4);
  }
  else if (scissors === true && randNum === 0) {
    text("p2 rockwin", width / 2, height / 4);
  }
  else if (scissors === true && randNum === 1) {
    text("p1 scissorwin", width / 2, height / 4);
  }
  playerTurn = true;
}