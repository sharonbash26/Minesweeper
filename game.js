'use strict'

const BOMB = '💥'
const FLAG = '🚩'
var gBoard
var gIsGameOn = false
var gRoundNumber = 0
var gIsRightClick = false
var gLife = 3
var gIdIntervalTimer = 0
var gmarkedCount = 0
var gshownCount = 0
var gSizeBorad
var gIsWinner = false

function resetVariables() {
    clearInterval(gIdIntervalTimer)
    startTimer()
    gIsGameOn = true
    var smilie = document.querySelector('.smile')
    smilie.innerText = '😀'
    gRoundNumber = 0
    gIsRightClick = false
    gLife = 3
    var elLife = document.querySelector('h2 span')
    elLife.innerHTML = gLife
    gmarkedCount = 0
    gshownCount = 0
    gCounterSafeCells = 3
    var elText = document.querySelector('h7 span')
    elText.innerText = gCounterSafeCells
    var btn = document.querySelector('.safe-click')
    btn.disabled = false
    
}
function onInit() {
    gIsGameOn = true
    var smilie = document.querySelector('.smile')
    smilie.innerText = '😀'
    beginner()
    // gBoard = createBoard(4, 4)
    //  renderBoard(gBoard, '.board-container')
    // putRandomMins(2)
    //  renderBoard(gBoard, '.board-container')
    //gRoundNumber++

    // gBoard[0][2] = { minesAroundCount: 0, isShown: false, isMine: true, isMarked: false }
    // gBoard[1][2] = { minesAroundCount: 0, isShown: false, isMine: true, isMarked: false }
    //  gBoard = countMinesForAllCells(gBoard)
    //console.log('old table')
    // console.table(gBoard)
    //renderBoard(gBoard, '.board-container')
    //getNotMinsCellNotShownCell()

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
    resetVariables()
    var countRowsCols = 4
    var countMins = 2
    gBoard = createBoard(countRowsCols, countRowsCols)
    renderBoard(gBoard, '.board-container')
    putRandomMins(countMins)
    renderBoard(gBoard, '.board-container')
    gBoard = countMinesForAllCells(gBoard)
    renderBoard(gBoard, '.board-container')
    gRoundNumber++
    console.log('begin board')
    console.table(gBoard)
    
    checkAllTimeForSafeCells()
    return gBoard
}

function medium() {
    resetVariables()
    console.log('before', isBoardFull)
    var countRowsCols = 8
    var countMins = 14
    gBoard = createBoard(countRowsCols, countRowsCols)
    renderBoard(gBoard, '.board-container')
    putRandomMins(countMins)
    renderBoard(gBoard, '.board-container')
    gBoard = countMinesForAllCells(gBoard)
    renderBoard(gBoard, '.board-container')
    gRoundNumber++
    console.log('medium board')
    console.table(gBoard)
    checkAllTimeForSafeCells()
    return gBoard
}

function expert() {
    resetVariables()
    console.log('before', isBoardFull)
    var countRowsCols = 12
    var countMins = 32
    gBoard = createBoard(countRowsCols, countRowsCols)
    renderBoard(gBoard, '.board-container')
    putRandomMins(countMins)
    renderBoard(gBoard, '.board-container')
    gBoard = countMinesForAllCells(gBoard)
    renderBoard(gBoard, '.board-container')
    gRoundNumber++
    console.log('expert board')
    console.table(gBoard)
    checkAllTimeForSafeCells()
    return gBoard
}
function isBoardFull() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (!gBoard[i][j].isShown && !gBoard[i][j].isMarked) {
                return false
            }
        }
    }
    return true
}

function putRandomMins(count) {
    var randomI
    var randonJ
    var randomItem
    for (var i = 0; i < count; i++) {
        randomI = getRandomInt(0, gBoard.length - 1)
        randonJ = getRandomInt(0, gBoard.length - 1)
        randomItem = gBoard[randomI][randonJ].isMine = true
    }

}
function openFirstDegreeNeighbors(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === cellI && j === cellJ) continue
            if (gBoard[i][j].minesAroundCount === 0 && !gBoard[i][j].isShown && !gBoard[i][j].isMine) {
                // console.log('i', i, 'j', j)
                // model:
                gBoard[i][j].isShown = true
                gshownCount++
                // console.log(gBoard)
                // dom:
                var countBombs = gBoard[cellI][cellJ].minesAroundCount

                var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                elCell.innerText = countBombs

                /// return openFirstDegreeNeighbors(i,j) //this is not correct 
            }
        }
    }
}

function checkVictory() {
    if (gLife === 0) {
        var smilie = document.querySelector('.smile')
        smilie.innerText = '😥'
        gIsGameOn = false
        return
    }
    var res = isBoardFull()
    var isWinner = isWinnerCondition()
    if (res) {
        if (isWinner) {
            var elSmile = document.querySelector('.smile')
            elSmile.innerText = '😎'
            clearInterval(gIdIntervalTimer)
            clearInterval(gIdIntervalSafeCells)
            clearTimeout(gIdTimeout)
            gIsGameOn = false
        }
    }
}
function isWinnerCondition() {
    var allMinesFlagged = true
    var allOtherCellsShown = true
    var numMinesSteppedOn = 0

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            if (cell.isMine) {
                if (cell.isMarked) {
                    continue // If the mine is marked, we skip it
                } else if (cell.isShown) {
                    numMinesSteppedOn++
                    if (numMinesSteppedOn > 2) {
                        return false // If the player steps on more than 2 mines, they lose
                    }
                } else {
                    allMinesFlagged = false
                }
            } else {
                if (!cell.isShown) {
                    allOtherCellsShown = false
                }
            }
        }
    }

    return allMinesFlagged && allOtherCellsShown
}


function startTimer() {
    var timer = document.querySelector("h3 span")
    var seconds = 0;
    var minutes = 0;
    var hours = 0;
    gIdIntervalTimer = setInterval(function () {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
        timer.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    }, 1000);
}


