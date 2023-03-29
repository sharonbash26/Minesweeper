'use strict'

const BOMB = '💥'
const FLAG = '🚩'
var gBoard
function onInit() {
    gBoard = createBoard(8, 8)
    renderBoard(gBoard, '.board-container')

    gBoard = countMinesForAllCells(gBoard)
    console.log('gBoard', gBoard)

    renderBoard(gBoard,'.board-container')

}

function createBoard(rows, cols) {
    var board = []
    for (var i = 0; i < rows; i++) {
        board.push([])
        for (var j = 0; j < cols; j++) {
            board[i][j] = ''
            //board[i][j] = (Math.random() > 0.5) ? LIFE : ''
            ///TODO RANDOM THIS AFTEER THIS
        }
    }
    board[0][2] = BOMB
    board[1][3] = BOMB
    return board;

}
function countMinesForAllCells(board) {
    var newBoard = copyMat(board)
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var numOfNegs = countNegs(i, j, board) 
                if (board[i][j] === '') newBoard[i][j] = numOfNegs  
             //else if (board[i][j] === BOMB) newBoard[i][j] = ''
        }
    }
    return newBoard
}
