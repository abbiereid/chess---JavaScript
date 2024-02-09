const gameboard = document.querySelector("#gameboard")
const turnDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8

const startPieces = [
    Rook,Knight,Bishop,Queen,King,Bishop,Knight,Rook,
    Pawn,Pawn,Pawn,Pawn,Pawn,Pawn,Pawn,Pawn,
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    Pawn,Pawn,Pawn,Pawn,Pawn,Pawn,Pawn,Pawn,
    Rook,Knight,Bishop,Queen,King,Bishop,Knight,Rook
]

const IDs = [
    [1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],
    [2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],
    [3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],
    [4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],
    [5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],
    [6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[6,8],
    [7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7],[7,8],
    [8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8]
]

let currentPlayer = 'black'


function createBoard() {

    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.setAttribute('squareID',IDs[i])
        square.innerHTML = startPiece
        square.firstChild?.setAttribute('draggable', true)
    


        const row = Math.floor((63-i) / 8 ) + 1
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "beige" : "brown")
        } else {
            square.classList.add(i % 2 === 0 ? "brown" : "beige")
        }

        if ( i <= 15 ) {
            square.firstChild.firstChild.classList.add('black')
        }

        if (i >= 48) {
            square.firstChild.firstChild.classList.add('white')
        }

        gameboard.append(square)

    })

    turnPicker()

}

createBoard()


const allSquares = document.querySelectorAll("#gameboard .square")

allSquares.forEach(square => {
    square.addEventListener('dragstart',dragStart)
    square.addEventListener('dragover',dragOver)
    square.addEventListener('drop',dragDrop)
})

let startPositionID
let draggedElement

function dragStart (e) {
    const colour = e.target.parentNode.firstChild.firstChild.classList[0]
    
    if (currentPlayer !== colour) {
      e.preventDefault(); // Preventing drag start if it's not the current player's piece
    }

    startPositionID = e.target.parentNode.getAttribute('squareID')
    draggedElement = e.target
}


function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) {
    e.stopPropagation()

    const takingAPiece = e.target.firstChild !== null
    if (takingAPiece) {
        e.target.firstChild.remove()
    }
    e.target.append(draggedElement)

    turnPicker()
}

function turnPicker() {
    currentPlayer = currentPlayer === 'white' ? 'black' : 'white'
    turnDisplay.textContent = currentPlayer

    const pieceSquares = document.querySelectorAll(`#gameboard .square svg.${currentPlayer}`)
    const otherSquares = document.querySelectorAll(`#gameboard .square svg:not(.${currentPlayer})`)
    console.log(pieceSquares)
    console.log(otherSquares)
}