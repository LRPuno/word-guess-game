// Grab our DOM Elements
var $wins = document.getElementById('winsid');
var $losses = document.getElementById('lossid');
var $incorrectwordbank = document.getElementById('incorrect-word-bank');
var $remainguesses = document.getElementById('remain-guesses');
var $guesstheword = document.getElementById('guesstheword');

// This creates all the possible words.

var wordlist=["pistol","gunslinger","western", "shuriken","katana","stealth","duel","saloon","warrior","outlaw","assassin","fighter","japan"];

// "Empty" Variables That Will Be Updated As the Game Continues.

var wins=0; //Wins stored.
var losses=0; //Losses stored.
var blanknums=0; //Number of blanks depending on the word.
var remainguesses=10; //Amount of guesses that you have.
var blankSuccesses= [];// Holds a mixture of blanks and successes. Essentially this will hold underscores and letters in an array (each underscore and letter has a different index)
var incorrectletters=[]; //Letters that you guessed wrong.
var brokendownWords =[]; //Used to store letters that will be compared to the picked word.
var pickedword =""; //The word that's actually going to be picked and filled later on throughout the code.
var guessedLetterBank =""; //Letters that you have guessed.

// Start Function
function initGame() {

    // Reset Guess Counter
    remainguesses=10;

    // This generates the random word that would be picked from the word list array.

    pickedword = wordlist[Math.floor(Math.random() * wordlist.length)];

    // Word is broken down into individual letters.

    brokendownWords = pickedword.split("");

    // The number of letters in the word.

    blanknums = brokendownWords.length;

    // Reset Blanks
    blankSuccesses= [];

    // Reset Wrong GUesses
    incorrectletters=[];

    // Fill up the blanksAndSuccesses list with appropriate number of blanks.
    // This is based on number of letters in pickedword (essentially).
    for (var i = 0; i < blanknums; i++) {
        blankSuccesses.push("_");
    }

    // Reset the guesses

    $remainguesses.innerHTML=remainguesses;

    $guesstheword.innerHTML=blankSuccesses.join(" ");

    $incorrectwordbank.innerHTML=incorrectletters.join(" ");
}

// Checking the Letters. 

function letterchecker(letter) {

    // This boolean will be toggled based on whether or not
    // a user letter is found anywhere in the word.

    var letterInword = false;

    // Check if a letter exists inside the array at all.
    for (var i = 0; i < blanknums; i++) {

        if (pickedword[i] === letter) {

            // If the letter exists then toggle this boolean to true.
            // This will be used in the next step.
            letterInword = true;
        }

    }
    
    // If the letter exists somewhere in the word, matches the index.
    if (letterInword) {

        for (var k=0; k < blanknums; k++) {
            
            // Populate the blanksAndSuccesses with every instance of the letter.
            
            if (pickedword[k] === letter) {
                
                blankSuccesses[k] = letter;
            
            }
        
        }
    }


    // If the letter doesn't exist at all. Push it to the wrong letter box and subtract chances.
    else {
        
        incorrectletters.push(letter);
        remainguesses--;

    }


}

// Ran after you finish the game. The win/loss conditions that happens afterward.
function GuesserComplete () {

    // Reset Stuff
    $remainguesses.innerHTML=remainguesses;

    $guesstheword.innerHTML=blankSuccesses.join(" ");

    $incorrectwordbank.innerHTML=incorrectletters.join(" ");

    if (brokendownWords.toString() === blankSuccesses.toString()) {

        // Add to the win counter
        wins++;
    
        // Give the user an alert
        alert("Nice");
    
        // Update the win counter in the HTML
        $wins.innerHTML = wins;
    
        // Restart the game
        initGame();
    }

    // Below is the same as the win except reversed. Self-explanatory.
    else if  (remainguesses===0) {
        losses++
        alert("You Suck");
        $losses.innerHTML= losses;
        initGame();
    }

}

// THe actual code that is run. By pressing a key, it starts the actual functions of the game.

initGame();

document.onkeyup=function(x) {
    guessedLetterBank = String.fromCharCode(x.which).toLowerCase();
    letterchecker(guessedLetterBank);
    GuesserComplete();
}


















