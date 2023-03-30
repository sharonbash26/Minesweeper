'use strict'

const BOMB = '💥'
const FLAG = '🚩'
var gBoard
var gIsGameOn = false
var gRoundNumber = 0
var gIsRightClick = false

function onInit() {
    gBoard = createBoard(4, 4)
    renderBoard(gBoard, '.board-container')
    putRandomMins(2)
    renderBoard(gBoard, '.board-container')
    gRoundNumber++

    // gBoard[0][2] = { minesAroundCount: 0, isShown: false, isMine: true, isMarked: false }
    // gBoard[1][2] = { minesAroundCount: 0, isShown: false, isMine: true, isMarked: false }
    gBoard = countMinesForAllCells(gBoard)
    console.log('old table')
    console.table(gBoard)
    renderBoard(gBoard, '.board-container')

}

function createBoard(rows, cols) {
    var board = []
    for (var i = 0; i < rows; i++) {
        board.push([])
        for (var j = 0; j < cols; j++) {
            board[i][j] = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false }
        }

    }
    return board;
}




function countMinesForAllCells(board) {
    var newBoard = copyMat(board)
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var numOfNegs = countNegs(i, j, board)
            if (board[i][j]) {
                newBoard[i][j].minesAroundCount = numOfNegs
            }
        }
    }
    return newBoard
}
///!!!!!!!!!!!!!!!!!!!when i have a timeee change it to oneee functionnn !!! stages TODO !!!!!
function beginner() {
    var countRowsCols = 4
    var countMins = 2
    gBoard = createBoard(countRowsCols, countRowsCols)
    putRandomMins(countMins)
    renderBoard(gBoard, '.board-container')
    return gBoard
}

function medium() {
    var countRowsCols = 8
    var countMins = 14
    gBoard = createBoard(countRowsCols, countRowsCols)
    putRandomMins(countMins)
    renderBoard(gBoard, '.board-container')
    return gBoard
}

function expert() {
    var countRowsCols = 12
    var countMins = 32
    gBoard = createBoard(countRowsCols, countRowsCols)
    putRandomMins(countMins)
    renderBoard(gBoard, '.board-container')

    return gBoard
}

function putRandomMins(count) {
  //  debugger
    var randomI
    var randonJ
    var randomItem
    for (var i = 0; i < count; i++) {
        randomI = getRandomInt(0, gBoard.length-1)
        randonJ = getRandomInt(0, gBoard.length-1)
        randomItem = gBoard[randomI][randonJ].isMine = true
        console.log('randomItem',randomItem)
    }
    console.log('new board')
    console.table(gBoard)
}



