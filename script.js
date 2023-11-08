// GAMEBOARD MODULE
const Gameboard = (() => {
    const gameboard = ["X","O","X","X","O","O","X","O","X"];
    
    // displays the gameboard on the DOM
    const render = () => {
        const board = document.querySelector(".gameboard");
        gameboard.forEach((cellContent, index) => {
            // create a div element with class cell
            let cell = document.createElement("div");
            cell.classList.add("cell");
            // adds id "cell-?" ? -> index number in array 
            cell.setAttribute("id", `cell-${index}`);
            // adds what ever content is in that index and displays it in DOM
            cell.textContent = cellContent;

            board.appendChild(cell);
        });
    }

    return { render }
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

    return {
        startGame
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