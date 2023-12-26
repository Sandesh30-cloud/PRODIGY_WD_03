document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const restartBtn = document.getElementById('restartBtn');
    const togglePlayerBtn = document.getElementById('togglePlayerBtn');
    const playerXBtn = document.getElementById('playerXBtn');
    const playerOBtn = document.getElementById('playerOBtn');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let againstAI = false;

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7], 
            [2, 5, 8],
            [0, 4, 8], 
            [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    };

    const checkTie = () => {
        return gameBoard.every(cell => cell !== '');
    };

    const restartGame = () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';

        cells.forEach((cell) => {
            cell.textContent = '';
        });

        updateTurnButtons();
    };

    const handleClick = (index) => {
        if (!gameBoard[index] && gameActive) {
            gameBoard[index] = currentPlayer;
            cells[index].textContent = currentPlayer;

            const winner = checkWinner();
            if (winner) {
                alert(`${winner} is the winner 🥳`);
                gameActive = false;
            } else if (checkTie()) {
                alert('Match tie!');
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

                if (againstAI && currentPlayer === 'O') {
                    playAI();
                }

                updateTurnButtons();
            }
        }
    };

    const playAI = () => {
        const emptyCells = gameBoard.reduce((acc, val, index) => {
            if (val === '') {
                acc.push(index);
            }
            return acc;
        }, []);

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const aiMove = emptyCells[randomIndex];

        setTimeout(() => {
            handleClick(aiMove);
        }, 500);
    };

    const updateTurnButtons = () => {
        playerXBtn.textContent = currentPlayer === 'X' ? " X's Turn" : "Player X";
        playerOBtn.textContent = currentPlayer === 'O' ? " O's Turn" : "Player O";
        playerXBtn.disabled = currentPlayer === 'O';
        playerOBtn.disabled = currentPlayer === 'X';
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            handleClick(index);
        });
    });

    restartBtn.addEventListener('click', () => {
        restartGame();
    });

    togglePlayerBtn.addEventListener('click', () => {
        againstAI = !againstAI;
        restartGame();
    });

    updateTurnButtons(); 
});
