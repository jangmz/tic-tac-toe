function Gameboard() {
    const row = 3;
    const col = 3;
    const board = [];
    
    // creating a 2D array gameboard
    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; j < col; j++){
            board[i][j] = "?"; // change here with the player mark
        }
    }

    // method for getting the entire basic board that UI will render
    const getBoard = () => board;

    // set a marker (player === marker) X or O
    const setMarker = (row, column, player) => {
        if (board[row][column] === "?") {
            board[row][column] = player;
        } else { // if the cell is not empty, move is invalid, stop execution
            return;
        }
    }

    // print the board
    const printBoard = () => {
        // goes row by row and prints the current values
        let boardWithCells = board.map((row) => row); 
        console.log(boardWithCells);
    }

    return {getBoard, printBoard};
}

/*
    cell represents one square
    ? -> empty
    X -> playerX
    O -> playerO
    */
function Cell() {
    // default value of a cell
    let cellValue = "?";

    // change default value with players mark
    const addMark = (player) => {
        cellValue = player;
    }

    // get value of the cell
    const getCell = () => cellValue;

    return {addMark, getCell};
}

function Game(playerName = "jan") {
    const board = Gameboard();

    // players info
    const players = [
        {
            name: playerName,
            mark: "X"
        },
        {
            name: "computer",
            mark: "O"
        }
    ];

    // who will start the game
    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const startGame = () => {
        console.log(`Game begins ${getActivePlayer.name} with mark: " ${getActivePlayer.mark} "`);
    }
}