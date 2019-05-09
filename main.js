const winArr = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//Array of all the quadrants
const grid = () => Array.from(document.getElementsByClassName("q"));

//Convert id to number
const qNumId = (qElem) => Number.parseInt(qElem.id.replace("q",""));

//Empty Qaudrants: array that returns emty empty quads
const emptyQuad = () => grid().filter(qEl => qEl.innerText === "");

//This funct takes array and tells whether or not all items within the array are same or not
// and also we don't want empty strings to count
const allSame = (arr) => arr.every(qEl => qEl.innerText === arr[0].innerText && qEl.innerText !== "");

//Decides whose turn it is. Here, index-> which quad and letter-> X or 0
const takeTurn = (index,letter) => grid()[index].innerText = letter;

//take Opponent Choice
const opponentChoice = () => qNumId(emptyQuad()[Math.floor(Math.random() * emptyQuad().length)]);

//do ths when game ends
const endGame = (winSeq) => {
    winSeq.forEach(qElem => qElem.classList.add("win"));
    disListener();
};

//check for Victory
const chkVictory = () => {
    let victory = false;
    winArr.forEach(win => {
        const gridElem = grid();
        const seq = [gridElem[win[0]], gridElem[win[1]], gridElem[win[2]]];
        if(allSame(seq)) {
            victory = true;
            endGame(seq);
        }
    });
    return victory;
}

//Wait for 1s and and enter opponent choice using a functiion
const opponentTurn = () => {
    disListener();
    setTimeout(()=> {
        takeTurn(opponentChoice(),0);
        if(!chkVictory()){
            enListener();
        }
    },1000);
}

//do this when clicked
const clickFn = ($event) => {
    //console.log($event.target);
    takeTurn(qNumId($event.target), 'X');
    if(!chkVictory()){
        opponentTurn();
    }  
}

// //Add Click Listener
const enListener = () => grid().forEach(qEl => { 
    qEl.addEventListener("click", clickFn); 
});

//Remove Click Listner

const disListener = () => grid().forEach(qEl => qEl.removeEventListener("click", clickFn));

enListener();


                