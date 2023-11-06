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

    // method for getting the entire board that UI will render
    const getBoard = () => board;

    // set a marker (player === marker)
    const setMarker = (row, column, player) => {
        if (board[row][column] === "?") {
            board[row][column] = player;
        }
    }

    return {getBoard};
}

function Players() {

}

function Game() {

}

Gameboard();