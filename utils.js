'use strict'

function renderBoard(mat, selector) {
    var cell
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            if (mat[i][j].isShown) {
                cell = mat[i][j].minesAroundCount
            } else {
                cell = '🟦'
            }

            const className = `cell cell-${i}-${j}`

            // TODO I ADD THIS AND I NEED TO CHANGE THIS ACCRODING !!!!!/////
            strHTML += `<td class="${className}"
            data-i="${i}" data-j="${j}"
            onclick="onCellClicked(this,${i},${j})">
            ${cell}</td>`
            //////////////////////////////////////////////////////////////////
            //strHTML += `<td class="${className}">${cell}" onclick="onCellClicked(this,${i},${j})</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}
function onCellClicked(elCell, cellI, cellJ) {
    
    var countBombs=gBoard[cellI][cellJ].minesAroundCount
    var elCell = document.querySelector(`[data-i="${cellI}"][data-j="${cellJ}"]`)
    if (gBoard[cellI][cellJ].isMine && gBoard[cellI][cellJ].isShown) {
        console.log('tt')
        elCell.innerText = BOMB
    }else{
        elCell.innerText=countBombs
    }
    if(gBoard[cellI][cellJ].isMark && gBoard[cellI][cellJ].isShown){
        elCell.innerText=FLAG
    }
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
            if (mat[i][j] === BOMB) negsCount++
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

