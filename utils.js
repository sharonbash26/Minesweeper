'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
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
function onCellClicked(elCell, cellI, cellJ){
    console.log('hi')
    var elCell = document.querySelector(`[data-i="${cellI}"][data-j="${cellJ}"]`)
    elCell.innerText = '😋'
}
//TODO I ADD THIS AND I NEED TO CHANGE THIS ACCRODING !!!!!
// function onCellClicked(elCell, cellI, cellJ) {
//     console.log('elCell', elCell)
//     console.log('cellI', cellI)
//     console.log('cellJ', cellJ)
//     // if(elCell.innerText === LIFE)
//     if (gBoard[cellI][cellJ] === BOMB) {
//         // model:
//         gBoard[cellI][cellJ] = BOMB
//         // console.log(gBoard)
//         // dom:
//         elCell.innerText = BOMB

//         blowUpNegs(cellI, cellJ)
//     }

// }

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

