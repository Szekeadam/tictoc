let currentPlayer = 'X'; // Kezdő játékos
let gameActive = true;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isSinglePlayer = false; // Ha 1 játékos módban játszunk
let isGameOver = false;

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const newGameButton = document.getElementById('new-game-btn');
const twoPlayersButton = document.getElementById('two-players-btn');
const onePlayerButton = document.getElementById('one-player-btn');
const gameBoardElement = document.querySelector('.game-board');

// Kezdőjáték mód választása
twoPlayersButton.addEventListener('click', () => {
  isSinglePlayer = false;
  resetGame();
});

onePlayerButton.addEventListener('click', () => {
  isSinglePlayer = true;
  resetGame();
});

// Új játék indítása
newGameButton.addEventListener('click', resetGame);

// A játék állapotának ellenőrzése
const checkWinner = () => {
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      isGameOver = true;
      statusDisplay.innerText = `${gameBoard[a]} játékos nyert!`;
      return;
    }
  }

  if (!gameBoard.includes('')) {
    gameActive = false;
    isGameOver = true;
    statusDisplay.innerText = 'A játék döntetlen.';
  }
};

// A számítógép lépése
const computerMove = () => {
  const emptyCells = gameBoard
    .map((value, index) => value === '' ? index : null)
    .filter(index => index !== null);

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  gameBoard[randomIndex] = 'O';
  cells[randomIndex].innerText = 'O';
  currentPlayer = 'X';
  checkWinner();
};

// Egy mezőre kattintás kezelése
const cellClickHandler = (e) => {
  const index = e.target.dataset.index;

  if (gameBoard[index] || !gameActive) return;

  gameBoard[index] = currentPlayer;
  e.target.innerText = currentPlayer;

  checkWinner();

  if (gameActive && isSinglePlayer && currentPlayer === 'X') {
    currentPlayer = 'O';
    setTimeout(computerMove, 500); // Kis késleltetés a gép lépésére
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
};

// Minden cella kattintási eseményének hozzáadása
cells.forEach(cell => {
  cell.addEventListener('click', cellClickHandler);
});

// Játék visszaállítása
const resetGame = () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  isGameOver = false;
  currentPlayer = 'X';

  cells.forEach(cell => {
    cell.innerText = '';
    cell.disabled = false;
  });

  statusDisplay.innerText = '';
  newGameButton.style.display = 'none';
};

// Új játék kezdése gomb megjelenítése
const updateGameStatus = () => {
  if (isGameOver) {
    newGameButton.style.display = 'inline-block';
  }
};
