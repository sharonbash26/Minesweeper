'use strict'
//sharon bashh
function renderBoard(mat, selector) {
    var cell
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            //debugger
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
    // debugger
    if (event.button === 2) { // right mouse button pressed
        event.preventDefault();// prevent default behavior of right click
        gIsRightClick = true
        onCellClicked(event.target, cellI, cellJ);
    } else {
        gIsRightClick = false // reset gIsRightClick to false
        onCellClicked(event.target, cellI, cellJ);
    }
}
function onCellClicked(elCell, cellI, cellJ) {
    gRoundNumber++
    if (gBoard[cellI][cellJ].isShown) {
        return
    }
    if (gIsRightClick) {
        if (elCell.innerText === FLAG) {
            elCell.innerText = '🟦'
            gBoard[cellI][cellJ].isMarked = false
            console.log('new board')
            console.table(gBoard)
            return
        } else if (elCell.innerText === '🟦' && !gBoard[cellI][cellJ].isMine)
            elCell.innerText = FLAG
        gBoard[cellI][cellJ].isMarked = true
        console.log('new board')
        console.table(gBoard)
        return
    }
    gIsRightClick = false
    //  debugger
    var countBombs = gBoard[cellI][cellJ].minesAroundCount
    var elCell = document.querySelector(`[data-i="${cellI}"][data-j="${cellJ}"]`)

    if (gBoard[cellI][cellJ].isMine && !gBoard[cellI][cellJ].isShown) {
        //debugger
        if (gRoundNumber === 2) {
            gBoard[cellI][cellJ].isMine = false   ///this for first time to give him number and not a bomb 
            elCell.innerText = countBombs
            gBoard[cellI][cellJ].isShown = true
            gRoundNumber++
            return
        } else {
            elCell.innerText = BOMB
            gBoard[cellI][cellJ].isShown = true
            return
        }


        //todo gane over 
    } else {
        elCell.innerText = countBombs
        gBoard[cellI][cellJ].isShown = true
        gBoard[cellI][cellJ].isMarked = false
    }

    console.log('new board')
    console.table(gBoard)

}




// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
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
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

