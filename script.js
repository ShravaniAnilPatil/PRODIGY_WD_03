const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restartBtn');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const turnMessage = document.getElementById('turnMessage');
const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');
const playerXSound = document.getElementById('playerXSound');
const playerOSound = document.getElementById('playerOSound');
const winningSound = document.getElementById('winningSound');
const winningMessage = document.getElementById('winningMessage');
const dancingCartoon = document.getElementById('dancingCartoon');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let player1Score = 0;
let player2Score = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));

    if (gameState[cellIndex] !== null || checkWinner()) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (currentPlayer === 'X') {
        playerXSound.play();
    } else {
        playerOSound.play();
    }

    if (checkWinner()) {
        setTimeout(() => {
            displayWinningMessage(`${currentPlayer} wins!`);
            playWinningSound();
            updateScore(currentPlayer);
            showDancingCartoon();
        }, 1000); // Delay appearance by one second
    } else if (gameState.every(cell => cell !== null)) {
        setTimeout(() => displayWinningMessage("It's a tie!"), 1000); // Delay appearance by one second
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnMessage.textContent = `${currentPlayer === 'X' ? player1Input.value || 'Player 1' : player2Input.value || 'Player 2'}'s turn (${currentPlayer})`;
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] !== null && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function restartGame() {
    gameState = Array(9).fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    turnMessage.textContent = `${player1Input.value || 'Player 1'}'s turn (X)`;
    winningMessage.textContent = '';
    hideDancingCartoon();
}

function displayWinningMessage(message) {
    winningMessage.textContent = message;
}

function playWinningSound() {
    winningSound.play();
}

function updateScore(player) {
    if (player === 'X') {
        player1Score++;
        score1.textContent = player1Score;
    } else {
        player2Score++;
        score2.textContent = player2Score;
    }
}

function showDancingCartoon() {
    dancingCartoon.style.display = "block";
}

function hideDancingCartoon() {
    dancingCartoon.style.display = "none";
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
