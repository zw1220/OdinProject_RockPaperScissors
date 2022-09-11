//  Random choice pick by computer
function getComputerChoice() {
  let choice = ["FIRE", "WATER", "ICE"];
  let randomNumber = Math.floor(Math.random() * choice.length);
  return choice[randomNumber];
}

// Default winner and score
let playerScore = 0;
let computerScore = 0;
let roundWinner = " ";

// Define winner and score calculation per round
function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    roundWinner = "draw";
  }
  if (
    (playerSelection === 'FIRE' && computerSelection === 'ICE') ||
    (playerSelection === 'WATER' && computerSelection === 'FIRE') ||
    (playerSelection === 'ICE' && computerSelection === 'WATER')
  ) {
    playerScore ++;
    roundWinner = "player";
  }
  if (
    (computerSelection === 'FIRE' && playerSelection === 'ICE') ||
    (computerSelection === 'WATER' && playerSelection === 'FIRE') ||
    (computerSelection === 'ICE' && playerSelection === 'WATER')
  ) {
    computerScore ++;
    roundWinner = "computer";
  }
  updateScoreMessage(roundWinner, playerSelection, computerSelection);
}

// Update score message
function updateScoreMessage(roundWinner, playerSelection, computerSelection) {
  if (roundWinner === "player") {
    scoreMessage.textContent = `${playerSelection} beats ${computerSelection}`;
  } else if (roundWinner === "computer") {
    scoreMessage.textContent = `${playerSelection} is beaten by ${computerSelection}`;
  } else {
    scoreMessage.textContent = "No effect, same element";
  }
}

// Play in web console without using JS DOM

// function game() {
//   for (let i = 0; i < 5; i++) {
//     let playerSelection = prompt("Select your choice").toUpperCase();
//     let computerSelection = getComputerChoice();  
//     console.log(playRound(playerSelection, computerSelection));
//     console.log("Player score = " + playerScore);
//     console.log("Computer score = " + computerScore);
//   }

//   // switch statement parameter = true, means will run the code.
//   switch (true) {
//     case (playerScore > computerScore):
//       console.log("Final winner : PLAYER");
//       break;
//     case (computerScore > playerScore):
//       console.log("Final winner : COMPUTER");
//       break;
//     default:
//       console.log("Final winner : DRAW! NO WINNER!");
//   }
// }


// Implementing with JS DOM

// Define UI elements
const scoreInfo         = document.getElementById("scoreInfo");
const scoreMessage      = document.getElementById("scoreMessage");
const playerSign        = document.getElementById("playerSign");
const computerSign      = document.getElementById("computerSign");
const playerScorePara   = document.getElementById("playerScore");
const computerScorePara = document.getElementById("computerScore");
const fireBtn           = document.getElementById("fireBtn");
const waterBtn          = document.getElementById("waterBtn");
const iceBtn            = document.getElementById("iceBtn");
const endgameModal      = document.getElementById("endgameModal");
const endgameMsg        = document.getElementById("endgameMsg");
const restartBtn        = document.getElementById("restartBtn");
const overlay           = document.getElementById("overlay");

// Assign logic to each of the button
fireBtn.addEventListener("click", () => handleClick("FIRE"));
waterBtn.addEventListener("click", () => handleClick("WATER"));
iceBtn.addEventListener("click", () => handleClick("ICE"));
restartBtn.addEventListener("click", restartGame);
overlay.addEventListener("click", closeEndGameModal);

// Main logic to run one round of game
// 5 rounds to declare winner
function handleClick(playerSelection) {
  
  // To prevent game round continue after > 5 round
  // Check before another round started
  // return keyword is use to escape the function if true
  if(isGameOver()) {
    openEndGameModal();
    return
  }

  const computerSelection = getComputerChoice();
  playRound(playerSelection, computerSelection);
  updateChoices(playerSelection, computerSelection);
  updateScore();

  if(isGameOver()) {
    openEndGameModal();
    setFinalMessage();
  }
}

// Display player and computer choice image
function updateChoices(playerSelection, computerSelection) {
  switch (playerSelection) {
    case "FIRE":
      playerSign.src = "img/fire.png"
      break;
    case "WATER":
      playerSign.src = "img/water.png"
      break;
    case "ICE":
      playerSign.src = "img/ice.png"
      break;
  }

  switch (computerSelection) {
    case "FIRE":
      computerSign.src = "img/fire.png"
      break;
    case "WATER":
      computerSign.src = "img/water.png"
      break;
    case "ICE":
      computerSign.src = "img/ice.png"
      break;
  }
}

// Update score info, player score and computer score
function updateScore() {
  if (roundWinner === "draw") {
    scoreInfo.textContent = "It's a draw!"
  } else if (roundWinner === "player") {
    scoreInfo.textContent = "You won!"
  } else if (roundWinner === "computer") {
    scoreInfo.textContent = "You lost!"
  }

  playerScorePara.textContent = `Player: ${playerScore}`;
  computerScorePara.textContent = `Computer: ${computerScore}`
}

// Game over = Winning 5 round
function isGameOver() {
  return playerScore === 5 || computerScore === 5
}

// Activate end game model after 5 rounds
function openEndGameModal() {
  endgameModal.classList.add("active");
  overlay.classList.add("active");
}

// Close end game model after restart game
function closeEndGameModal() {
  endgameModal.classList.remove("active");
  overlay.classList.remove("active");
}

// // Declare final winner
// function finalWinner() {
//   let result = " ";
//   if (playerScore > computerScore) {
//     result = "You won!";
//   } else if (computerScore > playerScore) {
//     result = "You lost...";
//   } else {
//     result = "No winner";
//   }
//   alert(`Game finished: ${result}`);
// }

// Display final message after 5 rounds
function setFinalMessage() {
  if (playerScore > computerScore) {
    endgameMsg.textContent = "You won!"
  } else {
    endgameMsg.textContent = "You lost..."
  }
}

// Reset game
function restartGame() {
  playerScore = 0;
  computerScore = 0;
  scoreInfo.textContent = "Choose your element";
  scoreMessage.textContent = "First to score 5 points wins the game";
  playerScorePara.textContent = "Player : 0";
  computerScorePara.textContent = "Computer : 0";
  playerSign.src = "img/question-mark.png";
  computerSign.src = "img/question-mark.png";
  closeEndGameModal();
}