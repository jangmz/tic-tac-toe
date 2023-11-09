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
        getUserInfo();

        // set the player who starts first
        currentPlayerIndex = Math.floor(Math.random() * 2);

        if (currentPlayerIndex === 1) computerChoice();

        // set the bool that the game is not over
        gameOver = false;

        // render the board if a person started the game first
        if (currentPlayerIndex === 1) Gameboard.render();
    }

    // reset the game
    const resetGame = () => {
        for (let i = 0; i < 9; i++) {
            Gameboard.updateCell(i, "");
        }
        displayControler.clearResults();
        gameOver = false;
        startGame;

        if (currentPlayerIndex === 1) {
            computerChoice();
        }
    }

    // when click on the board happens
    const cellClick = (event) => {
        if (gameOver === false) {
            //gets index of the clicked cell
            let index = event.target.id;
            Gameboard.updateCell(index, players[currentPlayerIndex].mark);
            
            // check if we have a winner
            checkResult();

            // switch the current player
            currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;

            // check if the current player is computer and call its function
            if (players[currentPlayerIndex].name === "Computer" && gameOver === false) computerChoice();
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
        Gameboard.updateCell(randomIndex, players[currentPlayerIndex].mark);
        
        checkResult();

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    const getUserInfo = () => {
        const playerName = document.querySelector("#player-name").value;
        const playerMark = document.querySelector("#player-mark").value;
        let computerMark = "X";

        if (playerMark === "X") computerMark = "O";
        
        players = [
            createPlayer(playerName, playerMark),
            createPlayer("Computer", computerMark)
        ];
    }

    // check the result
    const checkResult = () => {
        if (checkForWin(Gameboard.getGameboardArray())) {
            gameOver = true;
            displayControler.displayResults(`${players[currentPlayerIndex].name} won!`);
        } else if (checkForTie(Gameboard.getGameboardArray())) {
            gameOver = true;
            displayControler.displayResults("It's a tie!");
        }
    }

    return {
        startGame,
        resetGame,
        cellClick
    }
})();

// DISPLAY CONTROLER MODULE
const displayControler = (() =>{
    const displayResults = (msgFromGame) => {
        const resultModal = document.querySelector("#result");

        // create modal elements
        const message = document.createElement("p");
        message.classList.add("message");
        message.textContent = msgFromGame;
        const closeButton = document.createElement("button");
        closeButton.classList.add("btn");
        closeButton.textContent = "OK";

        closeButton.addEventListener("click", () => {
            resultModal.close();
        })

        resultModal.appendChild(message);
        resultModal.appendChild(closeButton);
        resultModal.showModal();
    }

    const clearResults = () => {
        const resultDiv = document.querySelector("#result");
        const message = document.querySelector(".message");
        if (message) {
            resultDiv.removeChild(message);
        }
    }

    return {
        displayResults,
        clearResults
    }
})();

// CHECK FOR WIN
const checkForWin = (board) => {
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ];

    // go through all the winning combinations and check if any of them matches
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true; // winning combination found
        }
    }
    return false;
}

// CHECK FOR TIE
const checkForTie = (board) => {
    if (!(board.includes(""))) {
        return true;
    }
    return false;
}

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