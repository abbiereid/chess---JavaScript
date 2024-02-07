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
    'A1','B1','C1','D1','E1','F1','G1','H1',
    'A2','B2','C2','D2','E2','F2','G2','H2',
    'A3','B3','C3','D3','E3','F3','G3','H3',
    'A4','B4','C4','D4','E4','F4','G4','H4',
    'A5','B5','C5','D5','E5','F5','G5','H5',
    'A6','B6','C6','D6','E6','F6','G6','H6',
    'A7','B7','C7','D7','E7','F7','G7','H7',
    'A8','B8','C8','D8','E8','F8','G8','H8'
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
        
    const taken = e.target.classList.contains('Piece')
    e.target.append(draggedElement)
        if (taken) {
            e.target.removeChild(e.target.firstChild)
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