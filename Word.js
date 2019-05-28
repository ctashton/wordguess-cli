var Letter = require("./Letter")

var Word = function(gameWord) {
    this.gameWord = gameWord;
    this.newLetters = [];
    this.blankAnswer = function (){
        var wordArray = this.gameWord.split("")
        // console.log("Word Array : " + wordArray)
        for (i = 0; i < wordArray.length; i++){
           var blank = new Letter(wordArray[i])
           this.newLetters.push(blank);
        }
    }
    this.realAnswer = function(guess) {
        for (let i = 0; i < this.newLetters.length; i++) {
            this.newLetters[i].guessCheck(guess)
        } 
    }
    this.letterCheck = function() {
        var newString = ''
        for (var i = 0; i < this.newLetters.length; i++){
            newString += this.newLetters[i].hidden();
        };
        return newString;
    }
}

module.exports = Word;