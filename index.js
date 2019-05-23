var inquirer = require("inquirer")
var Word = require("./Word")
var words = ["javascript", "python", "sql", "css", "html,", "jquery", "ruby", "react", "node", "firebase"]

var guessingWord = "";
var answerWord = "";
var guessesLeft = 7;
function confirm(){
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
function restartGame(){
    if (words.length<2) {
        words = ["javascript", "python", "sql", "css", "html", "jquery", "ruby", "react", "node", "firebase"];
    };
    var randomWord = Math.floor(Math.random()*words.length);
    console.log("random word: " + randomWord)
    answerWord = words[randomWord]
    console.log("answer word: " + answerWord)
    guessingWord = new Word(answerWord);
    console.log("guessing word: " + 
    guessingWord.gameWord)
    console.log("GWORD New Letters: " + guessingWord.newLetters)
    guessingWord.blankAnswer();
    console.log(guessingWord.newLetters)
    
    playGame();
}

function playGame(){
    if (guessesLeft > 0) {
        console.log("function play game guessingWord: " + guessingWord.letterCheck());
        inquirer.prompt([
            {
                type: "message",
                name: "guess",
                message: "Input a letter to make a guess.  Guess all of the correct letters to win!"
            }
        ]).then( function checkGuess(data) {
            if ((data.guess.length === 1)){
                console.log(data.guess + "valid uguess in checkGuess()")
                if(guessingWord.gameWord.includes(data.guess)){
                    for (let i = 0; i < guessingWord.newLetters.length; i++) {
                        guessingWord.newLetters[i].guessCheck(data.guess)
                    }
                }else{
                    guessesLeft--
                    console.log(guessesLeft)
                }

                playGame();
            } else { console.log (data.guess + "invalid uguess in checkguess()")
            console.log(guessesLeft)
            playGame();
        }

        }
        )

    }
    else{
        console.log("Game over::")
    }
    };



confirm();
