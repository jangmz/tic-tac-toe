// GAMEBOARD MODULE
const Gameboard = (() => {
    const gameboard = ["","","","","","","","",""];
    
    // displays the gameboard on the DOM
    const render = () => {
        const board = document.querySelector(".gameboard");
        const instructions = document.querySelector("#instructions");
        if (instructions) {
            board.removeChild(instructions);
        }
        gameboard.forEach((cellContent, index) => {
            // create a div element with class cell
            let cell = document.createElement("div");
            // adds class for easier styling and id "cell-?" ? -> index number in array 
            cell.classList.add("cell");
            cell.setAttribute("id", `${index}`);
            // adds what ever content is in that index and displays it in page
            cell.textContent = cellContent;
            // add an event listener for click if the cell is empty
            if (cellContent === "") {
                cell.addEventListener("click", gameControler.cellClick);
            }            
            board.appendChild(cell);
        });
    }

    // deletes current board display and re-renders it
    const refreshBoard = () => {
        const board = document.querySelector(".gameboard");
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            board.removeChild(cell);
        })
        render();
    }

    // updates the cell with a new player mark
    const updateCell = (cellIndex, playerMark) => {
        gameboard[cellIndex] = playerMark;
        refreshBoard();
    }

    // returns gameboard array
    const getGameboardArray = () => gameboard;

    return { render, updateCell, getGameboardArray }
})();

// FACTORY FUNCTION FOR PLAYER CREATION
const createPlayer = (name, mark) => {
    return {
        name,
        mark
    };
}

// GAMECONTROLER MODULE
const gameControler = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const startGame = () => {
        // create player with factory function, the second player is a computer
        players = [
            createPlayer(document.querySelector("#player-name").value, "X"),
            createPlayer("Computer", "O")
        ]
        // set the player who starts first
        currentPlayerIndex = 0;

        // set the bool that the game is not over
        gameOver = false;

        // render the board
        Gameboard.render();
    }

    // reset the game
    const resetGame = () => {
        for (let i = 0; i < 9; i++) {
            Gameboard.updateCell(i, "");
        }
    }

    // when click on the board happens
    const cellClick = (event) => {
        //gets index of the clicked cell
        let index = event.target.id;
        Gameboard.updateCell(index, players[currentPlayerIndex].mark);
        // switch the current player
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;

        // check if the current player is computer and call its function
        if (players[currentPlayerIndex].name === "Computer") {
            let cellIndex = computerChoice();
            Gameboard.updateCell(cellIndex, players[currentPlayerIndex].mark);
            currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        }
    }

    // computer function for random cell click
    const computerChoice = () => {
        const emptyCells = [];
        const gameboardArray = Gameboard.getGameboardArray();

        // find all empty cells and save indexes
        for (let i = 0; i < gameboardArray.length; i++) {
            if(gameboardArray[i] === "") {
                emptyCells.push(i);
            }
        }

        // choose a random index from available empty cells
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        return randomIndex;
    }

    return {
        startGame,
        resetGame,
        cellClick
    }
})();

// START GAME button
const startButton = document.querySelector("#start-btn");
startButton.addEventListener("click", () =>{
    //alert("start");
    gameControler.startGame();
});

// RESET GAME button
const resetButton = document.querySelector("#reset-btn");
resetButton.addEventListener("click", () => {
    //alert("reset");
    gameControler.resetGame();
});