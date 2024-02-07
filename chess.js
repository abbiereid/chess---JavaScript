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


function createBoard() {

    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.setAttribute('squareID',i)
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
    startPositionID = e.target.parentNode.getAttribute('squareID')
    draggedElement = e.target
}


function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) {
    e.stopPropagation()
    e.target.append(draggedElement)
}

