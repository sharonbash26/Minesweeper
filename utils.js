'use strict'
//sharon bashh
function renderBoard(mat, selector) {
    var cell
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            //debugger
            if (mat[i][j].isShown) {
                //console.log('mat[i][j]',mat[i][j].isShown,'hh')

                cell = mat[i][j].minesAroundCount
            } else {
                //console.log('mat[i][j]',mat[i][j].isShown,'hh')

                cell = '🟦'

            }

            const className = `cell cell-${i}-${j}`

            // TODO I ADD THIS AND I NEED TO CHANGE THIS ACCRODING !!!!!/////
            strHTML += `<td class="${className}"
            data-i="${i}" data-j="${j}"
            onclick="onCellClicked(this,${i},${j})" onmousedown="onCellMouseDown(event,${i},${j})">
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
function onCellClicked(elCell, cellI, cellJ,) {
  //  debugger
    if (gIsRightClick) {
        if (elCell.innerText === FLAG) {
            elCell.innerText = '🟦'
            gBoard[cellI][cellJ].isMark=false
            gBoard[cellI][cellJ].isShown=false
            console.log('new board')
            console.table(gBoard)
            return
        }
        elCell.innerText = FLAG
        gBoard[cellI][cellJ].isMark=true
        gBoard[cellI][cellJ].isShown=true
     //   gBoard[cellI][cellJ].isShown = true
    //    console.log('yy')
        // console.log(gBoard[cellI][cellJ].isShown)
        return
    }

    console.table(gBoard)
    gIsRightClick = false
    var countBombs = gBoard[cellI][cellJ].minesAroundCount
    var elCell = document.querySelector(`[data-i="${cellI}"][data-j="${cellJ}"]`)
    if (gBoard[cellI][cellJ].isMine && !gBoard[cellI][cellJ].isShown) {
        console.log('tt')
        elCell.innerText = BOMB
    } else {
        elCell.innerText = countBombs
    }
    if (gBoard[cellI][cellJ].isMark && gBoard[cellI][cellJ].isShown) {
        elCell.innerText = FLAG
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
            if (mat[i][j].isMine) {
                negsCount++
            }
            //console.log('i', i, 'j', j, 'negCount', negsCount)
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

