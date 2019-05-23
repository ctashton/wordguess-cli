var Letter = function(char) {
    this.char = char.toUpperCase();
    this.guessed = false
    this.hidden = function(){
        if (!this.guessed) {
            return "_";
        } else {
            return this.char;
        }
    }
    this.guessCheck = function(guess){
        if (this.char.toUpperCase == guess.toUpperCase) {
            this.guessed = true;
        }
    }
}

module.exports = Letter