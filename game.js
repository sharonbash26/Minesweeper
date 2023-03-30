'use strict'

const BOMB = '💥'
const FLAG = '🚩'
var gBoard
var gIsGameOn = false
var gRoundNumber=0
var gIsRightClick=false

function onInit() {
    gBoard = createBoard(4, 4)
    renderBoard(gBoard, '.board-container')
    gRoundNumber++
 
    gBoard[0][2] = { minesAroundCount: 0, isShown: false, isMine: true, isMarked: false }
    gBoard[1][2] = { minesAroundCount: 0, isShown: false, isMine: true, isMarked: false }
    gBoard = countMinesForAllCells(gBoard)
    //console.table(gBoard)

    renderBoard(gBoard, '.board-container')

}

function createBoard(rows, cols) {
    var board = []
    for (var i = 0; i < rows; i++) {
        board.push([])
        for (var j = 0; j < cols; j++) {
            board[i][j] = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false }
        }
        //board[i][j] = (Math.random() > 0.5) ? LIFE : ''
        ///TODO RANDOM THIS AFTEER THIS
    }
  return board;
}



function countMinesForAllCells(board) {
    var newBoard = copyMat(board)
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var numOfNegs = countNegs(i, j, board)
            if (board[i][j].isMine===false) {
                newBoard[i][j] = { minesAroundCount: numOfNegs, isShown: false, isMine: false, isMarked: false }
            } 
        }
    }
    return newBoard
}
