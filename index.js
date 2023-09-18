const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const playerInput = document.querySelector(".form-container");
const startNewGame = document.querySelector(".start-btn");
const player1 = document.querySelector(".player-1");
const player2 = document.querySelector(".player-2");
const gameWindow = document.querySelector(".game-container");

let currPlayer;
let gameGrid;

let clickSound = document.querySelector("#clickSound");
let drawSound = document.querySelector("#drawSound");
let winSound = document.querySelector("#winSound");

playerInput.classList.add("active");

playerInput.addEventListener("submit", (e) => {

    e.preventDefault();

    if(player1.value === "" || player2.value === ""){
        alertFunction();
        return;
    }

    playerInput.classList.remove("active");
    gameWindow.classList.add("active");
});

function alertFunction() {
    confirm("Please Enter Both Player Name");
}

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [0,3,6],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//lets create a function to initialize the game

initGame();
function initGame() {
    console.log("inside the init game function")
    currPlayer = "X";
    
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //Empty on UI
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // initialise boxes with its default css property
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currPlayer}`;

}


boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currPlayer;
        gameGrid[index] = currPlayer;
        clickSound.play();
        boxes[index].style.pointerEvents = "none";
        //swap turn
        swapTurn();
        //check if someone win the match
        checkGameOver();
    }
}

function checkGameOver() {
    let ans = "";
    winningPositions.forEach((position) => {
        // all 3 boxes shold be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            
                //check if winner is X
                if(gameGrid[position[0]] === "X"){
                    ans = "X";
                    
                }
                else{
                    ans = "O";
                }
        

                //disable pointer event
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })
                // now we know who is the winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
                winSound.play();
                

        }
    });

    if(ans !== ""){
        gameInfo.innerText = `Winner Player - ${ans}`;
        newGameBtn.classList.add("active");
        return;
    }

    //when there is no winner match tied
    let emptyBox = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            emptyBox++;
        }
    });

    if(emptyBox === 9){
        gameInfo.innerText = "Match Tied !";
        drawSound.play();
        newGameBtn.classList.add("active");
    }
    console.log("last in game over")
}

function swapTurn() {
    if(currPlayer === "X"){
        currPlayer = "O";
    }
    else{
        currPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

newGameBtn.addEventListener("click", initGame);

