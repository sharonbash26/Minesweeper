'use strict'

var gDarkMode = false
var gCounterSafeCells = 3
var gIdIntervalSafeCells
var gIdTimeout
var gRandomSafeItem
function darkModeToggle() {
    var body = document.querySelector('body')
    gDarkMode = !gDarkMode
    if (gDarkMode) {
        body.classList.add('dark-mode')
    } else {
        body.classList.remove('dark-mode')
    }
}

function safeClickBtn() {
    var btn = document.querySelector('.safe-click')
    if (gCounterSafeCells > 0) {
        var elText = document.querySelector('h7 span')
        gCounterSafeCells--
        elText.innerText = gCounterSafeCells
        var choosenRandomItem = gRandomSafeItem
        var elCellMark = document.querySelector(`.cell-${choosenRandomItem.i}-${choosenRandomItem.j}`)
        if (elCellMark) {
            elCellMark.style.backgroundColor = 'red'
            gIdTimeout = setTimeout(() => {
                elCellMark.style.backgroundColor = 'aliceblue'
            }, 1000);
            if (gCounterSafeCells === 0) {
                btn.disabled = true
                clearInterval(gIdIntervalSafeCells)
            }
        }
    }
}  

function getRandomSafeCells() {
    var randomI = getRandomInt(0, gBoard.length - 1)
    var randonJ = getRandomInt(0, gBoard.length - 1)
    var randomItem = gBoard[randomI][randonJ]
    if (!randomItem.isShown && !randomItem.isMine) {
        gRandomSafeItem={i:randomI,j:randonJ}
        return gRandomSafeItem
    }
}



function checkAllTimeForSafeCells() {
    gIdIntervalSafeCells = setInterval(getRandomSafeCells, 500)
}

