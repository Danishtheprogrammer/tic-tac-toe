const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const scoreXText = document.querySelector("#scoreX");
const scoreOText = document.querySelector("#scoreO");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let scoreX = 0;
let scoreO = 0;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `SYSTEM READY: Player ${currentPlayer}`;
}

function cellClicked() {
    const cellIndex = this.getAttribute("data-index");
    if (board[cellIndex] !== "" || !isGameActive) return;
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function checkWinner() {
    let roundWon = false;
    let winningCells = []; // Variable to store which boxes won

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = board[condition[0]];
        const cellB = board[condition[1]];
        const cellC = board[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") continue;
        
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            winningCells = condition; // Save the winning combination
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `VICTORY: Player ${currentPlayer} wins!`;
        isGameActive = false;
        
        // NEW CODE: Add the 'win' class to make those specific cells light up
        cells[winningCells[0]].classList.add("win");
        cells[winningCells[1]].classList.add("win");
        cells[winningCells[2]].classList.add("win");
        
        if (currentPlayer === "X") {
            scoreX++;
            scoreXText.textContent = scoreX;
        } else {
            scoreO++;
            scoreOText.textContent = scoreO;
        }
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "STALEMATE: Draw detected.";
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `AWAITING INPUT: Player ${currentPlayer}`;
}

function restartGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    statusText.textContent = `SYSTEM READY: Player ${currentPlayer}`;
    
    // NEW CODE: Clear the text AND remove the glowing 'win' class
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });
}

initializeGame();