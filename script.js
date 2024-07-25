let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let mode = '';
let playerSymbol = '';
let player1Name = '';
let player2Name = '';
let turnIndicator = document.getElementById('turn-indicator');

const cells = document.querySelectorAll('.cell');

function nextSlide(slide) {
    document.querySelectorAll('.slide').forEach(slide => slide.classList.remove('active'));
    document.getElementById(`slide-${slide}`).classList.add('active');
}

function selectMode(selectedMode) {
    mode = selectedMode;
    nextSlide(3);
    if (mode === 'pvp') {
        document.getElementById('pvp-names').style.display = 'block';
        document.getElementById('pvc-symbol').style.display = 'none';
    } else {
        document.getElementById('pvp-names').style.display = 'none';
        document.getElementById('pvc-symbol').style.display = 'block';
    }
}

function selectSymbol(symbol) {
    playerSymbol = symbol;
    currentPlayer = playerSymbol;
    turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
    startGame();
}

function startGame() {
    if (mode === 'pvp') {
        player1Name = document.getElementById('player1-name').value || 'Player 1';
        player2Name = document.getElementById('player2-name').value || 'Player 2';
    }
    nextSlide(4);
    updateTurnIndicator();
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    cells.forEach(cell => cell.textContent = '');
    updateTurnIndicator();
}

function goToHome() {
    resetGame();
    nextSlide(1);
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (gameOver) return;
        if (gameBoard[index] !== '') return;
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkForWinner();
        if (mode === 'pvc') {
            currentPlayer = currentPlayer === playerSymbol ? (playerSymbol === 'X' ? 'O' : 'X') : playerSymbol;
            if (!gameOver) {
                computerPlay();
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
        updateTurnIndicator();
    });
});

function updateTurnIndicator() {
    if (mode === 'pvp') {
        turnIndicator.textContent = currentPlayer === 'X' ? `${player1Name}'s turn (X)` : `${player2Name}'s turn (O)`;
    } else {
        turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function computerPlay() {
    let availableCells = gameBoard.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    if (availableCells.length > 0) {
        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        gameBoard[randomIndex] = currentPlayer;
        document.getElementById(`cell-${randomIndex}`).textContent = currentPlayer;
        checkForWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateTurnIndicator();
    }
}

function checkForWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameOver = true;
            alert(`Player ${gameBoard[a]} wins!`);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameOver = true;
        alert('It\'s a draw!');
    }
}

// Initialize the first slide
nextSlide(1);
