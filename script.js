// GAMEBOARD MODULE
const Gameboard = (() => {
    const gameboard = ["","","","","","","","",""];
    
    // displays the gameboard on the DOM
    const render = () => {
        const board = document.querySelector(".gameboard");
        gameboard.forEach((cellContent, index) => {
            // create a div element with class cell
            let cell = document.createElement("div");
            // adds class for easier styling and id "cell-?" ? -> index number in array 
            cell.classList.add("cell");
            cell.setAttribute("id", `${index}`);
            // adds what ever content is in that index and displays it in page
            cell.textContent = cellContent;
            // add an event listener for click and append the cell to the gameboard
            cell.addEventListener("click", gameControler.cellClick);
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

    return { render, updateCell }
})();

// PLAYER CREATION FACTORY FUNCTION
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
        // create players with factory function
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

    // get the current player mark


    // when click on the board happens
    const cellClick = (event) => {
        //cell index
        let index = event.target.id;
        Gameboard.updateCell(index, players[currentPlayerIndex].mark);
    }

    return {
        startGame,
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
    alert("reset");
});