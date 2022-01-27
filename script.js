const CAT_CLASS = 'Cat'; //x
const DOG_CLASS = 'Dog'; //o

 //Use an array to list all the possible combinations of filled cells that would qualify as a win
const possibleWins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const boardClass = $('#board');
const winText = document.querySelector('[data-winning-message-Text]');
const restartButton = document.getElementById('restartButton');
const onScreenRestart = document.getElementById('onScreenRestart')
const winMessageElement = document.getElementById('winMessage');
   
let dogsTurn;

startGame();
restartButton.addEventListener('click', startGame);
onScreenRestartButton.addEventListener('click', startGame);

//functions necessary to clear all data and the board and begin a new game
function startGame() {
    //start turn with Cat and announce "Cat goes first"
    dogsTurn = false; 
    clearFirstTurnAlert();
    showAlert();

    // showTurn(currentClass);
    cellElements.forEach(cell => {
        //set board back to start for each cell by removing the classes
        cell.classList.remove(CAT_CLASS);
        cell.classList.remove(DOG_CLASS);
        cell.removeEventListener('click', handleClick);
    
        //start game
        cell.addEventListener('click', handleClick, { once: true }) //once:true means only handle event once in each cell
    })

    //reset items to begin new game
    const winImageDiv = $('#winningImage');
    winImageDiv.empty();
    const turnDiv = $('turnDiv');
    turnDiv.empty();
    clearTurnAlert();
  
    //turn on hover state
    setBoardHoverClass(); 

    //set message back to start (hidden)
    winMessageElement.classList.remove('show');
}

function handleClick(e) {

    //placeMark (cat or dog)
    const cell = e.target;
    
    //determine turn
    var currentClass = dogsTurn ? DOG_CLASS : CAT_CLASS;
    placeMark(cell, currentClass);
    clearFirstTurnAlert()

    //checkForWin
    if (checkForWin(currentClass)) {
        endGame(false)
    //check for draw
    } else if (isDraw()) { 
        endGame(true) 
    //switch turns    
    } else {
        switchTurns();
        clearTurnAlert();
        currentClass = dogsTurn ? DOG_CLASS : CAT_CLASS;
        showTurn(currentClass);
    
        //set hover state
        setBoardHoverClass();
    }
}    

function endGame(draw) {
    if (draw) {
        var tie
        tie = document.createElement("img");
        tie.src = "dogandcattie.svg"
        tie.classList.add('winimg');
        document.getElementById('winningImage').appendChild(tie);
        winText.innerText = "It's a tie!"
    } else if (dogsTurn) {
        var dog
        dog = document.createElement("img");
        dog.src = "dogwins.svg"
        dog.classList.add('winimg');
        document.getElementById('winningImage').appendChild(dog);
        winText.innerText = 'Dog Wins!'
    } else if (!dogsTurn) {
        var cat
        cat = document.createElement("img");
        cat.src = "catwins.svg"
        cat.classList.add('winimg');
        document.getElementById('winningImage').appendChild(cat);
        winText.innerText = 'Cat Wins!'
    }

    //make winning message screen visible
    winMessageElement.classList.add('show');
}

function isDraw() {
    //destructor cellElements into an array to use the every method
    return [...cellElements].every(cell => { 
        return cell.classList.contains(CAT_CLASS) || cell.classList.contains(DOG_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function switchTurns() {
    dogsTurn = !dogsTurn;
}

function setBoardHoverClass() {
        board.classList.remove(CAT_CLASS);
        board.classList.remove(DOG_CLASS);
        if (dogsTurn) {
            board.classList.add(DOG_CLASS)
        } else {
            board.classList.add(CAT_CLASS)
        }
}

//if every cell in the current cell (one of the winning combinations) is filled with the current class, that class has won
function checkForWin(currentClass) {
    return possibleWins.some(combination => {
        return combination.every(indeCat => {
            return cellElements[indeCat].classList.contains(currentClass)
        })
    })
} 

function showAlert(message, className) {
        //Build div from scratch and insert into DOM
        const div = document.createElement('div');
        div.className = 'firstTurnDiv mt-3 mb-3 alert text-light text-center display-6 custom-alert';
        div.appendChild(document.createTextNode('Cats go first!'));
        const container = document.querySelector('.container'); //parent element
        const board = document.querySelector('.board'); //element it goes before
        container.insertBefore(div, board); //insert the div before the form
}
    
function showTurn(currentClass) {
    //Build div from scratch and insert into DOM
    const div = document.createElement('div');
    div.className = 'turnDiv mt-3 mb-3 alert text-light text-center h1 display-6 custom-alert';
    const turnText = `${currentClass}'s Turn!`
    div.appendChild(document.createTextNode(turnText));
    const container = document.querySelector('.container'); //parent element
    const board = document.querySelector('.board'); //element it goes before
    container.insertBefore(div, board); //insert the div before the form
}

function clearTurnAlert() {
    const clearedAlert = $('.turnDiv');
    clearedAlert.remove();
}

function clearFirstTurnAlert() {
    const clearedFirstAlert = $('.firstTurnDiv');
    clearedFirstAlert.remove();
}