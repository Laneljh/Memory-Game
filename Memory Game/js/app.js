/*
 * Create a list that holds all of your cards(or the icons that IDENTIFY the cards)
 */
let icons = ["fa fa-bug", "fa fa-bug", "fa fa-cog", "fa fa-cog", "fa fa-coffee", "fa fa-coffee", "fa fa-bolt",  "fa fa-bolt", "fa fa-code", "fa fa-code", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-rocket", "fa fa-rocket"]

const cardsContainer = document.querySelector('.deck');

let openedCards = [];
let matchedCards = [];


/*
 * Initialize the game
 */

function init(){

    shuffle(icons);
    icons = shuffle(icons);

    for(let i = 0; i < icons.length; i++) {
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `<i class="${icons[i]}"></i>`
        cardsContainer.appendChild(card);
    
        //Add click Event to each Card
        click(card);
    }
}

/*
 * Click Event
 */

function click(card) {
    
    // Card Click Event
    card.addEventListener('click', function() {

        const currentCard = this;
        const previousCard = openedCards[0];

        //Existing opened cards
        if(openedCards.length === 1) {

        card.classList.add('open', 'show', 'disable');
        openedCards.push(this);    

        // Compare the two opened cards
        compare(currentCard, previousCard);

        } else {
            //No opened cards
        currentCard.classList.add('open', 'show', 'disable');
        openedCards.push(this);
        
        }
    });
}

/*
 * Compare the 2 cards
 */

 // Matcher
 function compare(currentCard, previousCard) {
    if(currentCard.innerHTML === previousCard.innerHTML) {
            
        currentCard.classList.add('match');
        previousCard.classList.add('match');

        matchedCards.push(currentCard, previousCard);

        openedCards = [];

        //Check to see if all cards have been matched

        isOver(); // This calls the function to check and see if the game is over. Hence the name.

    } else { 

        setTimeout(function() {
        currentCard.classList.remove('open', 'show', 'disable');
        previousCard.classList.remove('open', 'show', 'disable');  

        }, 500);
        openedCards = [];
    }

    // Add new move 
    addMove();
 }

/*
 * Check if the game is over
 */ 

function isOver(){
    if(matchedCards.length === icons.length && moves >= 30) { 
    //reset timer
    let timer = document.querySelector(".timer");
    swal({
        title: "Nice one!",
        text: "You finished the game in " + timer.innerHTML + " with " + (moves + 1) + " moves played and a score of 1 star!", 
        icon: "success",
        button: "Play Again",
      });
      clearInterval(interval);
    } else if (matchedCards.length === icons.length && moves >= 22) {
        swal({
            title: "Nice one!",
            text: "You finished the game in " + timer.innerHTML + " with " + (moves + 1) + " moves played and a score of 2 stars!", 
            icon: "success",
            button: "Play Again",
          });
          clearInterval(interval);
    } else { 
        if(matchedCards.length === icons.length && moves < 22){
            swal({
                title: "Nice one!",
                text: "You finished the game in " + timer.innerHTML + " with " + (moves + 1) + " moves played and a score of 3 stars!", 
                icon: "success",
                button: "Play Again",
              });
              clearInterval(interval);
        }
    }
    let playAgain = document.querySelector('.swal-button');
              playAgain.addEventListener('click', function(){
                //Delete all cards
                cardsContainer.innerHTML = '';
                //Call 'init' to create new cards
                init();
                // Shuffles Cards 

                // Reset any related variables
                openedCards = [];
                matchedCards = [];
                moves = 0;
                movesContainer.innerHTML = moves;
                starsContainer.innerHTML = 
                `<li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>`;
                timer.innerHTML = '0 mins 0 secs'
              })
}

/*
 * Add moves
 */

const movesContainer = document.querySelector('.moves');
let moves = 0;
movesContainer.innerHTML = 0;
function addMove(){
    moves++;
    movesContainer.innerHTML = moves;
    rating();

    if(moves == 1) {
        second = 1;
        minute = 0;
        hour = 0;
        startTimer();
    }    
}

 /*
 * Rating 
 */

const starsContainer = document.querySelector('.stars');
starsContainer.innerHTML = 
`<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>`;

function rating(){
    if(moves >= 30){
        starsContainer.innerHTML = 
        `<li><i class="fa fa-star"></i></li>`;
    } else if(moves >= 22) {
        starsContainer.innerHTML = 
        `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
    } else {
        starsContainer.innerHTML = 
        `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
    }
}

/*
 * Restart Button
 */

const restartBtn = document.querySelector('.restart');

restartBtn.addEventListener('click', function(){   
    //reset timer
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
    

    //Delete all cards
    cardsContainer.innerHTML = '';
    //Call 'init' to create new cards
    init();
    // Shuffles Cards 

    // Reset any related variables
    openedCards = [];
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = 
    `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
})

/*
 * Initial game load-up
 */

init();


 //Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(icons) {
    var currentIndex = icons.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = icons[currentIndex];
        icons[currentIndex] = icons[randomIndex];
        icons[randomIndex] = temporaryValue;
    }

    return icons;
};



//game timer
let second = 0, minute = 0;
let timer = document.querySelector(".timer");
let interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+" mins "+second+" secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

