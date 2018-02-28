
// List of all card symbols.
const cards = ['fa-diamond', 'fa-diamond', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-leaf', 'fa-leaf', 'fa-car', 'fa-car', 'fa-bicycle', 'fa-bicycle',
               'fa-headphones', 'fa-headphones', 'fa-paper-plane-o', 'fa-paper-plane-o'];

// Global veriables assignment.
let turnedCards = [];
let guessedCards = [];
const deck = document.querySelector('.deck');
const modal = document.getElementsByClassName("modal")[0];
let counter = 0;
let moves = document.getElementsByClassName("moves")[0];
let stars = document.getElementsByClassName("stars")[0].children;
let repeat = document.getElementsByClassName("restart")[0].children[0];
let seconds = document.getElementsByClassName("seconds")[0];
let minutes = document.getElementsByClassName("minutes")[0];
let hours = document.getElementsByClassName("hours")[0];
let timer = document.getElementsByClassName("timer")[0].children;
let totalSeconds = 0;
let totalMinutes = 0;
let totalHours = 0;

// Starting the game code by calling the display function and starting the timer
display();
setInterval(postTime, 1000);
repeat.addEventListener('click', newGame);

// @description two functions responsible for posting time to HTML in 00:00 format
// idea credit: https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
function postTime() {
  ++totalSeconds;
  seconds.innerHTML = timerCheck(totalSeconds % 60);
  minutes.innerHTML = timerCheck(parseInt(totalSeconds / 60));
  totalMinutes = timerCheck(parseInt(totalSeconds / 60));
  hours.innerHTML = timerCheck(parseInt(totalMinutes / 60));
  totalHours = timerCheck(parseInt(totalMinutes / 60));
}
function timerCheck(val) {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// @description the function generates elements with cards, appends them to the container
// and adds event listener to each card.
function display() {
  shuffle(cards);
  for (let i = 0; i < cards.length; i++) {
    const containers = document.createElement("li");
    deck.appendChild(containers);
    containers.classList.add("card", cards[i], "fa");
    containers.addEventListener('click', showCards);
  }
}

// @description shows cards upon click by manipulating class names and saves the cards.
function showCards() {
    event.target.classList.toggle("show");
    event.target.classList.toggle("open");
    event.target.classList.toggle("deactivate");
    turnedCards.push(this);
    counterCheck();
}

// @description keeps track of moves and deactivates play field.
function counterCheck() {
    if (turnedCards.length >= 2) {
      counter += 1;
      moves.innerText = counter;
      deck.classList.add("deactivate");
      window.setTimeout(matchNoMatch, 700);
      ratingCheck();
    }
}

// @description checks, if two saved cards match, reactivates play field,
// saves cards in case of a match, empties active turned cards array and
// ckecks, whether a game has been won.
function matchNoMatch() {
    if (turnedCards[0].className === turnedCards[1].className) {
        turnedCards[0].classList.add("match");
        turnedCards[1].classList.add("match");
        guessedCards.push(turnedCards[0], turnedCards[1]);
        turnedCards = [];
        deck.classList.remove("deactivate");
        if (guessedCards.length === cards.length) {
          results();
        }
    }
    else {
        turnedCards[0].classList.remove("show", "open", "deactivate");
        turnedCards[1].classList.remove("show", "open", "deactivate");
        turnedCards = [];
        deck.classList.remove("deactivate");
    }
}

// @description handles rating star symbols by manipulating classes.
function ratingCheck() {
    if (counter === 9) {
      stars[2].classList.remove("fa-star");
      stars[2].classList.add("fa-star-half");
    }
    else if (counter === 12) {
      stars[2].classList.remove("fa-star-half");
    }
    else if (counter === 18) {
      stars[1].classList.remove("fa-star");
      stars[1].classList.add("fa-star-half");
    }
    else if (counter === 28) {
      stars[1].classList.remove("fa-star-half");
    }
}

// @description starts a new game by reloading page.
function newGame() {
  location.reload();
}

// @description brings up the popup window with results summary.
function results() {
  modal.style.display = "block";
  let modContent = document.getElementsByClassName("modal-content")[0];
  let starHeading = "<h4>Your star rating:</h4>";
  modContent.insertAdjacentHTML('beforeend', starHeading);
  for (var i = 0; i <= 2; i++) {
    let cloneStar = stars[i].cloneNode(true);
    modContent.appendChild(cloneStar);
  }
  let timeHeading = "<h4>It took you:</h4>";
  modContent.insertAdjacentHTML('beforeend', timeHeading);
  for (var i = 0; i <= 5; i++) {
    let cloneTimer = timer[i].cloneNode(true);
    modContent.appendChild(cloneTimer);
  }
  let movesHeading = "<h4>Total moves:</h4>";
  modContent.insertAdjacentHTML('beforeend', movesHeading);
  let cloneMoves = moves.cloneNode(true);
  modContent.appendChild(cloneMoves);
  let button = '<br><button class="button" onclick="newGame()">Start over</button>';
  modContent.insertAdjacentHTML('beforeend', button);
}

// @description Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
