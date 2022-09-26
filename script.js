const gameBoard = document.querySelector('.game-board');
const gameBoardDivs = gameBoard.children;
const GUESS_LENGTH = 5;
let firstGuessArray = [];
let iterationCount = 0;

// GET WORD OF THE DAY
async function getWord() {
  const res = await fetch('https://words.dev-apis.com/word-of-the-day');
  const { word: wordRes } = await res.json();
  const word = wordRes.toUpperCase();
  const wordParts = word.split('');
  console.log(wordParts, 'CRAZE');

  function enter() {
    for (let i = 0; i < 5; i++) {
      let concatenatedGuessTest = (gameBoardDivs[0].innerHTML +=
        gameBoardDivs[i].innerHTML);
    }

    for (let i = 0; i < 5; i++) {
      let concatGuess = gameBoardDivs[i].innerHTML.toUpperCase().toString();
      let concatenatedGuess = (gameBoardDivs[0].innerHTML +=
        gameBoardDivs[i].innerHTML);

      console.log(concatGuess, 'Concat Guess');
      console.log(concatenatedGuessTest, 'Concatenated Guess');

      if (concatGuess === wordParts[i].toString() && isLetter(concatGuess)) {
        gameBoardDivs[i].style.backgroundColor = 'green';
        console.log(isLetter(concatGuess));
      } else if (
        gameBoardDivs[i].innerHTML.concat() ===
        isLetter(!gameBoardDivs[i].innerHTML.concat())
      ) {
        console.log('match');
      }
    }
  }

  function enterTest() {
    let concatGuess =
      (gameBoardDivs[0].innerHTML +=
      gameBoardDivs[1].innerHTML +=
      gameBoardDivs[2].innerHTML +=
      gameBoardDivs[3].innerHTML +=
        gameBoardDivs[4].innerHTML);

    if (iterationCount < 5) {
      return;
      console.log('not enough letters guessed');
    } else if (guessCheck(concatGuess)) {
      console.log('is');
    }
  }

  // Check if the guess is a real word
  //   function guessCheck(value) {
  //   const response = await fetch('https://words.dev-apis.com/validate-word', {
  //     method: 'POST',
  //     body: JSON.stringify({ word: value }),
  //   });
  //   const { validWord } = await response.json();

  //   // not valid, mark the word as invalid and return
  //   if (!validWord) {
  //     markInvalidWord();
  //     return;
  //   }
  // }

  function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

  function firstGuess(value) {
    if (
      value.keyCode >= 65 &&
      value.keyCode <= 90 &&
      GUESS_LENGTH > iterationCount
    ) {
      gameBoardDivs[iterationCount].innerHTML = value.key;
      iterationCount++;
    } else if (
      value.keyCode !== 65 &&
      value.keyCode !== 90 &&
      value.keyCode !== 13 &&
      value.keyCode !== 8
    ) {
      console.log('non number');
    } else if (value.keyCode === 13 && iterationCount === 5) {
      enterTest();
    } else if (value.keyCode === 8) {
      console.log('backspace');
      gameBoardDivs[iterationCount - 1].innerHTML = '';
      iterationCount--;
    }
  }

  function run() {
    window.addEventListener('keydown', function (event) {
      firstGuess(event);
    });
  }

  run();
}

getWord();
