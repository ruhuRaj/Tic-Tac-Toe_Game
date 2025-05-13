const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let's create a function to initialize the game
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    // UI pr empty bhi krna pdega boxes pr (when new game button ckicked)
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";

        // remove green-background color and again initiliaze as initial
        box.classList=`box box${index+1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;

}

initGame();

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        // swap karo turn ko
        swapTurn();
        // check karo koi jeet to nahi gaya
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    // update UI
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let winner="";

    winningPositions.forEach((position)=>{
        // all 3 boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]]!=="" && gameGrid[position[1]]!=="" && gameGrid[position[2]]!=="") && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){

            // check if winner is X
            if(gameGrid[position[0]]==="X"){
                winner="X";
            }
            else{
                winner="O";
            }

            // disable pointer events
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            // now we know X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // it means we have a winner
    if(winner!==""){
        newGameBtn.classList.add("active");
        gameInfo.innerText=`Winner Player - ${winner}`;
        return;
    }

    // lets check whether there is a TIE
    let filledCount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            filledCount++;
        }
    });
    // board is filled it means game is TIED
    if(filledCount===9){
        gameInfo.innerText="Game Tied!!";
        newGameBtn.classList.add("active");
    }
}

newGameBtn.addEventListener("click",initGame);