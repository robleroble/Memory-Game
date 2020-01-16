const startBtn = document.querySelector('#startbtn');
const gameHolder = document.querySelector('#gameHolder');
const yourScore = document.querySelector('#yourScore');
const resetBtn = document.querySelector('#reset');
const bestScore = document.querySelector('#bestScore');
let lettersArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
let card1 = null;
let card2 = null;
let numMoves = 0;
let score = 0
let savedScore = localStorage.getItem('bestScore');
//

if (savedScore) {
    bestScore.innerText = savedScore;
} else {
    bestScore.innerText = 0;
}

//sets bestScore to numMoves
yourScore.innerText = numMoves;

//I just googled how to shuffle an array and got this: Fisher-Yates Shuffle
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

//Function that places the values and cards upon starting the game
function placeCards() {
    shuffleArray(lettersArr);
    for (let i = 0; i < 20; i++) {
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.innerHTML = `<h3 class="hidden" data-num="${i}">${lettersArr[i]}</h3`;
        gameHolder.append(newCard);
    }
}

function endGame() {
    gameHolder.innerHTML = "";
    const youWinBox = document.createElement("div");
    youWinBox.innerHTML = `<h1 id="finalScore">You win with a score of ${yourScore.innerText}. Reset the board to play again!</h1>`;
    gameHolder.append(youWinBox);
    if (bestScore.innerText == 0) {
        localStorage.setItem('bestScore', yourScore.innerText)
        bestScore.innerText = yourScore.innerText;
    } else if(bestScore.innerText > yourScore.innerText) {
        localStorage.setItem('bestScore', yourScore.innerText)
        bestScore.innerText = yourScore.innerText;
    }
}

//Event listener on the reset button to reset the game
resetBtn.addEventListener('click', function() {
    gameHolder.innerHTML = "";
    placeCards();
    score = 0;
    yourScore.innerText = 0;
});

//This initiates the start of game
startBtn.addEventListener('click', function() {
    startBtn.remove();
    placeCards();
})

gameHolder.addEventListener('click', playGame);

function playGame(e) {
    //This set of code sets card1 and card2 to the h3 element inside the card selected
    if (e.target.tagName === "DIV" && card1 === null && e.target.firstChild.className === "hidden") {
        card1 = e.target.firstChild;
        e.target.firstChild.classList.toggle("hidden");
        yourScore.innerText++;
    } else if (e.target.tagName === "DIV" && card1 !== null && card2 === null && e.target.firstElementChild.dataset.num !== card1.getAttribute("data-num") && e.target.firstChild.className === "hidden") {
        card2 = e.target.firstChild;
        e.target.firstChild.classList.toggle("hidden");
        yourScore.innerText++;
    } 
    
    //Checks to see if the innerText of card1 and 2 match
    if (card1.innerText === card2.innerText) {
        card1.parentElement.classList.add('match');
        card2.parentElement.classList.add('match');
        card1 = null;
        card2 = null;
        score++;
    } else {
    //if (card1.innerText !== card2.innerText) {
        setTimeout(function() {
            card1.classList.toggle("hidden");
            card2.classList.toggle("hidden");
            card1 = null;
            card2 = null;
        }, 1000);
    }

    //ends game when all cards are flipped
    if (score == 10) {
        endGame()
    }
}
