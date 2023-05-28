//loads the default size of the board at page load (16x16)
window.onload = createBoard;

let gridSize;
let penColor;
const black = document.querySelector('.black').value;
const rainbow = document.querySelector('.rainbow').value
const shade = document.querySelector('.shade').value;

//assigns event listeners to the different buttons
document.querySelector('.enter').addEventListener('click', customBoard)
document.querySelector('.black').addEventListener('click', penChoice)
document.querySelector('.random').addEventListener('click', penChoice)
document.querySelector('.rainbow').addEventListener('click', penChoice)
document.querySelector('.shade').addEventListener('click', penChoice)
document.querySelector('.clear').addEventListener('click', clear)

//clears the board by creating a board from the last gridSize value
function clear() {
    createBoard(gridSize);
    penColor = ' ';
}

//assigns the value of random button to a random hex value and assigns penColor variable to the event target object value
function penChoice(event) {
    document.querySelector('.random').value = '#' + Math.floor(Math.random() * 16777215).toString(16);
    penColor = event.target.value; //assigns a value to the penColor which is the button that was clicked
    console.log(event.target.value)
}
//creates a custom board of choice if entered number is greater than 100 the created board is defaulted to 16
function customBoard() {
    gridSize = document.querySelector('#grid-size').value;
    if (gridSize <= 100) {
        createBoard(+gridSize)
    } else {
        createBoard(16)
    }
}

function createBoard(squares) {
    let board = document.querySelector('.board-container');
    if (board.innerHTML != '') { //this erases existing grid present without this multiple grids would be created on the container
        board.innerHTML = ''
    }
    if (gridSize == null || gridSize == undefined) { //defaults the value of squares to 1 - used for page load default value of 16
        squares = 16;
    }
    for (let i = 0; i < squares; i++) { //creates a grid based on the passed squares argument
        let board = document.querySelector('.board-container')
        let row = document.createElement('div')
        row.classList.add('row')
        board.appendChild(row)
        for (let j = 0; j < squares; j++) {
            let column = document.createElement('div')
            column.classList.add('column')
            row.appendChild(column)
            column.addEventListener('mouseover', color) //appends an event listener to each created column div
        }
    }
    gridSize = squares; //assigns gridSize to the value of squares which will be used later for the clear function
    console.log(gridSize)
}

function color(event) {
    if (penColor == 'rainbow') {    //if the penColor value is rainbow assign a random background color per box hovered
        event.target.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
    } else if (penColor == 'shade') {

        /* checks the opacity of the event target object if it is an empty string
            the background color of the target is set to white, conditional checks
            current opacity if it is null it is assigned a value of 0.1, else it is
            assigned a value of the currentOpacity value plus 0.1
         */

        const currentOpacity = event.target.style.opacity;
        if (event.target.style.backgroundColor = " ") {
            event.target.style.backgroundColor = 'rgb(0, 0, 0)';
            if (currentOpacity) {
                event.target.style.opacity = +(currentOpacity) + 0.1;
            } else {
                event.target.style.opacity = 0.1;
            }
        }
    } else {
        event.target.style.backgroundColor = penColor;
    }
}