var inquirer = require("inquirer")
var Word = require("./Word")
var words = ["javascript", "python", "sql", "css", "html,", "jquery", "ruby", "react", "node", "firebase"]

var guessingWord = "";
var answerWord = "";
var guessesLeft = 7;

function confirm() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "start",
            message: "Welcome to WordGuess-CLI, Development Edition!  You get 7 guesses to guess the coding language.  Are you ready to begin?"
        }
    ]).then(function (input) {
        if (!input.start) {
            console.log("Maybe Next Time.")
            return;
        } else {
            restartGame();
        }
    });
};

function restartGame() {

    words = ["javascript", "python", "sql", "css", "html", "jquery", "ruby", "react", "node", "firebase"];

    var randomWord = Math.floor(Math.random() * words.length);
    // console.log("random word: " + randomWord)
    answerWord = words[randomWord]
    // console.log("answer word: " + answerWord)
    guessingWord = new Word(answerWord);
    // console.log("guessing word: " + guessingWord.gameWord)
    // console.log("GWORD New Letters: " + guessingWord.newLetters)
    guessingWord.blankAnswer();

    playGame();
}

function isTrue(el, index, arr) {
  if (index === 0) {
      return true;
  } else {
      return (el.guessed === arr[index-1].guessed)
  }
}
function winCheck() {

    var youWin = guessingWord.newLetters.every(isTrue)
    if (!youWin) {
        playGame()
    }
    else{
        console.log("You Win!")
        inquirer.prompt([
            {
                type: "confirm",
                name: "winner",
                message: "You WIN!!! The word was " + guessingWord.gameWord + ". Would you like to play again?"
            }
        ]).then(function(input) {
            if (!input.winner) {
                console.log("Maybe next time.")
                return;
            } else{
                restartGame();
            }
        }

        )
    }
    
}

function playGame() {
    if (guessesLeft > 0) {
        inquirer.prompt([
            {
                type: "message",
                name: "guess",
                message: "Input a letter to make a guess.  Guess all of the correct letters to win!\n\nThe current word is " + guessingWord.letterCheck()
            }
        ]).then(function checkGuess(data) {
            if ((data.guess.length === 1)) {
                if (guessingWord.gameWord.includes(data.guess)) {
                    for (let i = 0; i < guessingWord.newLetters.length; i++)
                        if (guessingWord.newLetters[i].char === data.guess.toUpperCase()) {
                            guessingWord.newLetters[i].guessCheck(data.guess)
                        }
                        winCheck(guessingWord);

                    // console.log(guessingWord)
                } else {
                    guessesLeft--
                    console.log(guessesLeft + " guesses left.")
                    playGame()
                }

                
            } else {
                console.log(data.guess + "You have too many characters!")
                console.log(guessesLeft)
                playGame();
            }

        }
        )

    }
    else {
        console.log("Game over::")
    }
};



confirm();
