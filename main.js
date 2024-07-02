var currentPlayer = 'X';
var team = '';
let board = ['', '', '', '', '', '', '', '', ''];
let resetBtn = document.getElementById('btn-reset');
let title = document.getElementById('title');
let statusGame = document.getElementById('status');
let player = document.getElementById('choose-player');
let grid = document.getElementById('grid');

grid.style.display = 'none';
resetBtn.style.display = 'none';
statusGame.style.display = 'none';

let isOver = false;

function choosePlayer(param) {
    currentPlayer = param;
    team = param;
    grid.style.display = 'grid';
    player.style.display = 'none';
}

function move(index) {
    if (board[index] === '' && !isOver) {
        board[index] = currentPlayer;
        grid.children[index].textContent = currentPlayer;
        const winPattern = checkWin();
        if (winPattern) {
            resetBtn.style.display = 'block';
            title.style.display = 'none';
            isOver = true;
            statusGame.style.display = 'block';
            if (currentPlayer === team) {
                statusGame.innerHTML = 'Người chơi thắng! <i class="fa-regular fa-face-grin-wink"></i>';
            } else {
                statusGame.innerHTML =
                    'Bot nó đánh random mà bạn cũng thua! </br> Nhìn lại bản thân đi <i class="fa-regular fa-face-tired"></i>';
            }
            winPattern.forEach((index) => {
                grid.children[index].style.backgroundColor = 'yellow';
            });
        } else if (board.every((cell) => cell !== '')) {
            resetBtn.style.display = 'block';
            isOver = true;
            statusGame.style.display = 'block';
            title.style.display = 'none';
            statusGame.textContent = 'Hòa!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer !== team) {
                botMove();
            }
        }
    }
}

function botMove() {
    let emptyCells = [];
    board.forEach((cell, index) => {
        if (cell === '') {
            emptyCells.push(index);
        }
    });
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    move(emptyCells[randomIndex]);
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // win dòng
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // win cột
        [0, 4, 8],
        [2, 4, 6], // win chéo
    ];

    for (let pattern of winPatterns) {
        if (pattern.every((index) => board[index] === currentPlayer)) {
            console.log(pattern);
            return pattern;
        }
    }
    return null;
}

function reset() {
    resetBtn.style.display = 'none';
    statusGame.style.display = 'none';
    title.style.display = 'block';
    player.style.display = 'block';
    grid.style.display = 'none';
    isOver = false;
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    team = '';
    Array.from(grid.children).forEach((cell) => {
        cell.textContent = '';
        cell.style.backgroundColor = '';
    });
}
