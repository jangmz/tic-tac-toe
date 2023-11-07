// GAMEBOARD MODULE
const Gameboard = (() => {
    const gameboard = ["X","O","X","X","O","O","X","O","X"];
    
    // displays the gameboard on the DOM
    const render = () => {
        const board = document.querySelector(".gameboard");
        gameboard.forEach((cellContent, index) => {
            // create a div element with class cell
            let cell = document.createElement("div").className("cell");
            // adds id "cell-?" ? -> index number in array 
            cell.id(`cell-${index}`);
            // adds what ever content is in that index and displays it in DOM
            cell.textContent = cellContent;

            board.appendChild(cell);
        });
    }

    return { render }
})();

// PLAYER CREATION FACTORY FUNCTION
const createPlayer = (name, mark) => {
    
}

// GAMECONTROLER MODULE
const gameControler = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const startGame = () => {
        // create players
    }
})();

// START GAME button
const startButton = document.querySelector("#start-btn");
startButton.addEventListener("click", () =>{
    alert("start");
});

// RESET GAME button
const resetButton = document.querySelector("#reset-btn");
resetButton.addEventListener("click", () => {
    alert("reset");
});