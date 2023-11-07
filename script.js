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
            return true;
        } else { // if the cell is not empty, move is invalid
            alert("Cell unavailable, try again!");
            return false;
        }
    }

    // print the board
    const printBoard = () => {
        // goes row by row and prints the current values
        let updatedBoard = board.map((row) => row); 
        console.log(updatedBoard);
    }

    return {getBoard, setMarker, printBoard};
}

/*
    cell represents one square
    ? -> empty
    X -> playerX
    O -> playerO
    
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
*/

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

    // switch active players
    const switchActivePlayer = () => {
        // returns the other player
        const newActivePlayer = players.filter((player) => player.mark != activePlayer.mark);
        // sets the returned player to be the active player
        activePlayer = newActivePlayer[0];
        alert(`It's your turn ${activePlayer.name}`);
    }

    // start of the game
    const startGame = () => {
        console.log(`Start of the game! \n Turn: ${activePlayer.name} with mark: ${activePlayer.mark}`);
        playRound();
    }

    const playRound = () => {
        board.printBoard();
        let col, row;
        do {
            col = prompt("Select column");
            row = prompt("Select row");
        } while(!board.setMarker(row, col, activePlayer.mark)); 
        switchActivePlayer();
    }

    return {startGame, playRound};
}

const game = Game();
game.startGame();
game.playRound();