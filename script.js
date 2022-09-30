const gameBoard = document.querySelector('.game-board');
const gameBoardDivs = gameBoard.children;
const result = document.querySelector('.result');
let GUESS_LENGTH = 5;
let correctLetter = 0;
let iterationCount = 0;

async function wordMaster() {
  const res = await fetch('https://words.dev-apis.com/word-of-the-day');
  const { word: wordRes } = await res.json();
  const word = wordRes.toUpperCase();
  const wordCheck = word + word + word + word + word;
  console.log(word);

  function guessChecker() {
    for (let i = 0; i < GUESS_LENGTH; i++) {
      console.log(wordCheck[i]);
      console.log(gameBoardDivs[i]);
      if (gameBoardDivs[i].innerHTML.toUpperCase() === wordCheck[i]) {
        console.log('match!');
        gameBoardDivs[i].style.backgroundColor = 'green';
        gameBoardDivs[i].style.color = 'white';
        correctLetter++;
      } else if (gameBoardDivs[i].innerHTML.toUpperCase() !== wordCheck[i]) {
        gameBoardDivs[i].style.backgroundColor = 'grey';
        gameBoardDivs[i].style.color = 'white';
      }
    }

    if (correctLetter === 5) {
      console.log('winner');
      result.innerHTML = 'YOU WON!';
    }

    GUESS_LENGTH = GUESS_LENGTH + 5;
  }

  function enter() {
    if (iterationCount < GUESS_LENGTH) {
      console.log('not enough letters');
      return;
    } else if (iterationCount === GUESS_LENGTH) {
      console.log('run guess checker');
      guessChecker();
    }
  }

  function backspace() {
    if (iterationCount + 5 === GUESS_LENGTH) {
      console.log('no letters to delete');
    } else {
      gameBoardDivs[iterationCount - 1].innerHTML = '';
      iterationCount--;
    }
  }

  function input(value) {
    if (
      value.keyCode >= 65 &&
      value.keyCode <= 90 &&
      GUESS_LENGTH !== iterationCount
    ) {
      gameBoardDivs[iterationCount].innerHTML = value.key;
      iterationCount++;
    } else if (
      (value.keyCode < 65 && value.keyCode !== 8 && value.keyCode !== 13) ||
      value.keyCode > 90
    ) {
      console.log('inactive key!', value.keyCode);
      return;
    } else if (value.keyCode === 13) {
      enter();
    } else if (value.keyCode === 8) {
      backspace();
    }
  }

  function initialise() {
    window.addEventListener('keydown', function (event) {
      input(event);
    });
  }

  initialise();
}

wordMaster();
