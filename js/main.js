const MAX_SCORE = 5;
let playerScore = 0;
let computerScore = 0;

// Gameplay Logic
const play = (playerSelection) => {
  const computerSelection = getComputerChoice();
  const result = getRoundResult(playerSelection, computerSelection);
  updateScores(result);
  updateScoreDisplays();
  updateInstruction(result);
  updateMoveHistory(playerSelection, computerSelection);
  checkEndGame();
};

const getComputerChoice = () => {
  const choices = ['Rock', 'Paper', 'Scissors'];
  const randomNumber = Math.floor(Math.random() * choices.length);
  return choices[randomNumber];
};

const getRoundResult = (playerSelection, computerSelection) => {
  if (playerSelection === computerSelection) {
    return 'You drew the round!';
  }

  if ((playerSelection === 'Rock' && computerSelection === 'Scissors') ||
    (playerSelection === 'Paper' && computerSelection === 'Rock') ||
    (playerSelection === 'Scissors' && computerSelection === 'Paper')) {
    return 'You win the round!';
  }

  return 'You lose the round!';
};

// Score Update and Display
const updateScores = (result) => {
  if (result.includes('win')) {
    playerScore++;
  } else if (result.includes('lose')) {
    computerScore++;
  }
};

const updateScoreDisplays = () => {
  document.querySelector('#player-score').textContent = playerScore;
  document.querySelector('#computer-score').textContent = computerScore;
};

// Game Instructions
const updateInstruction = (text) => {
  const instruction = document.querySelector('#instruction');
  instruction.textContent = text;
};

// Move History
const updateMoveHistory = (playerMove, computerMove) => {
  appendMoveToHistory(playerMove, '#player-history');
  appendMoveToHistory(computerMove, '#computer-history');
};

const appendMoveToHistory = (move, selector) => {
  const moveElement = document.createElement('h2');
  moveElement.textContent = move;
  document.querySelector(selector).appendChild(moveElement);
};

// Game State
const checkEndGame = () => {
  if (playerScore === MAX_SCORE || computerScore === MAX_SCORE) {
    endGame();
  }
};

const endGame = () => {
  disableOptions();
  showGameResult();
  displayResetButton();
};

const resetGame = () => {
  playerScore = 0;
  computerScore = 0;
  updateScoreDisplays();
  enableOptions();
  resetInstruction();
  removeResetButton();
  clearMoveHistory();
};

// Game Option Handlers
const disableOptions = () => {
  const options = document.querySelectorAll('.option');
  options.forEach(option => option.onclick = null);
};

const enableOptions = () => {
  document.querySelector('.rock').onclick = () => play('Rock');
  document.querySelector('.paper').onclick = () => play('Paper');
  document.querySelector('.scissors').onclick = () => play('Scissors');
};

// Reset Button
const displayResetButton = () => {
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset';
  resetButton.onclick = resetGame;
  const optionsDiv = document.querySelector('.options');
  optionsDiv.parentNode.insertBefore(resetButton, optionsDiv.nextSibling);
};

const removeResetButton = () => {
  const resetButton = document.querySelector('button');
  resetButton.parentNode.removeChild(resetButton);
};

// Instruction Reset
const resetInstruction = () => {
  const instruction = document.querySelector('#instruction');
  instruction.textContent = 'Choose an option to begin!';
  instruction.style.color = 'black';
};

// Clear History
const clearMoveHistory = () => {
  document.querySelector('#player-history').innerHTML = '';
  document.querySelector('#computer-history').innerHTML = '';
};

// Display Game Result
const showGameResult = () => {
  const instruction = document.querySelector('#instruction');
  if (playerScore > computerScore) {
    instruction.textContent = 'Congratulations! You win the game!';
    instruction.style.color = 'green';
  } else if (playerScore < computerScore) {
    instruction.textContent = 'Sorry, you lost the game. Better luck next time!';
    instruction.style.color = 'red';
  } else {
    instruction.textContent = 'It\'s a draw!';
    instruction.style.color = 'grey';
  }
};

enableOptions();
