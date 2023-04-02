'use strict'

var gFirstMarkCell = 0

function renderBoard(mat, selector) {
    var cell
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            if (!mat[i][j].isShown) {
                cell = '🟦'
            }
            const className = `cell cell-${i}-${j}`
            strHTML += `<td class="${className}"
            data-i="${i}" data-j="${j}"
            onclick="onCellClicked(this,${i},${j})" onmousedown="onCellMouseDown(event,${i},${j})">
            ${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

function onCellMouseDown(event, cellI, cellJ) {
    if (event.button === 2) { // right mouse button pressed
        gIsRightClick = true
        onCellClicked(event.target, cellI, cellJ)
    } else {
        gIsRightClick = false // reset gIsRightClick to false
        onCellClicked(event.target, cellI, cellJ)
    }
}

function onCellClicked(elCell, cellI, cellJ) {
    checkVictory()
    if (!gIsGameOn) {
        clearInterval(gIdIntervalTimer)
        clearInterval(gIdIntervalSafeCells)
        clearTimeout(gIdTimeout)
        var btn = document.querySelector('.safe-click')
        btn.disabled = true
        return
    }
    gRoundNumber++
    if (gBoard[cellI][cellJ].isShown) {
        return
    }
    if (gIsRightClick) {
        if (elCell.innerText === FLAG) {
            elCell.innerText = '🟦'
            gmarkedCount--
            gBoard[cellI][cellJ].isMarked = false
            console.log('new board')
            console.table(gBoard)
            return
        } else if (elCell.innerText === '🟦' && !gBoard[cellI][cellJ].isShown)
            elCell.innerText = FLAG
        gBoard[cellI][cellJ].isMarked = true
        gmarkedCount++
        console.log('new board')
        console.table(gBoard)
        return
    }
    gIsRightClick = false
    var resIsOneMarked = checkIfOneCellMarked()
    var countBombs = gBoard[cellI][cellJ].minesAroundCount
    var elCell = document.querySelector(`[data-i="${cellI}"][data-j="${cellJ}"]`)
    if (gBoard[cellI][cellJ].isMine && !gBoard[cellI][cellJ].isShown) {
        openFirstDegreeNeighbors(cellI, cellJ)
        if ((gRoundNumber === 2 || resIsOneMarked && gFirstMarkCell === 1)) {
            if (gBoard[cellI][cellJ].isMarked) {
                return
            }
            gBoard[cellI][cellJ].isMine = false   ///this for first time to give him number and not a bomb 
            elCell.innerText = countBombs
            openFirstDegreeNeighbors(cellI, cellJ)
            gshownCount++
            gBoard[cellI][cellJ].isShown = true
            gRoundNumber++
            return
        } else {
            if (gBoard[cellI][cellJ].isMarked) {
                return
            }
            elCell.innerText = BOMB
            gBoard[cellI][cellJ].isShown = true
            gshownCount++
            gLife--
            var elLife = document.querySelector('h2 span')
            elLife.innerText = gLife
            return
        }
    } else {
        if (gBoard[cellI][cellJ].isMarked) {
            return
        }
        openFirstDegreeNeighbors(cellI, cellJ)
        elCell.innerText = countBombs
        gBoard[cellI][cellJ].isShown = true
        gshownCount++
        gBoard[cellI][cellJ].isMarked = false
    }
    console.log('new board')
    console.table(gBoard)
}

function countNegs(rowIdx, colIdx, mat) {
    var negsCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue
            if (i === rowIdx && j === colIdx) continue
            if (mat[i][j].isMine) {
                negsCount++
            }
        }
    }
    return negsCount
}

function copyMat(mat) {
    var newMat = []
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = []
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j]
        }
    }
    return newMat
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}
//for first click
function checkIfOneCellMarked() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMarked) {
                gFirstMarkCell++
                return true
            }
        }
    }
    return false
}



