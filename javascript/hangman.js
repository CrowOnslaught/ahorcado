class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = "";
    this.letters = [];
    this.guessedLetters  = "";
    this.errorsLeft = 10;
  }

  pickWord() 
  {
    let l_rng = Math.floor(Math.random() * this.words.length);
    console.log(this.words[l_rng]);
    return this.words[l_rng];
  }

  checkIfLetter(keyCode) //Check if key is a letter value (a-z)
  {
    console.log(keyCode);
    return (keyCode >= 65 && keyCode <=90);
  }

  checkClickedLetters(letter) //Check if key letter was already pushed
  {
    console.log(this.guessedLetters.includes(letter));
    let l_result = (this.letters.indexOf(letter) > -1) || this.guessedLetters.includes(letter);
    return l_result;
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;
  }

  addWrongLetter(letter) 
  {
    this.letters.push(letter);

    this.errorsLeft--;
  }

  checkGameOver() 
  {
    return (this.errorsLeft <= 0);
  }

  checkWinner() 
  {
    for (let i = 0 ; i < this.secretWord.length; i++)
      if(!this.guessedLetters.includes(this.secretWord[i]))
        return false;

    return true;
  }
}

let hangman;
let playing = false;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) 
{
  startGameButton.addEventListener('click', event => {
    playing = true; 
    console.log(playing);
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);

    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    hangmanCanvas.createBoard();
  });
}

document.addEventListener('keydown', event => {
  if(!playing)
    return;

  let l_letter = event.key;
  if(hangman.checkIfLetter(event.keyCode))
  {
    if(!hangman.checkClickedLetters(l_letter))
    {
      if(hangman.secretWord.includes(l_letter))
      {
        hangman.addCorrectLetter(l_letter);
        for (let i = 0; i < hangman.secretWord.length; i++) 
        {
          const l_element = hangman.secretWord[i];
          if(l_element == l_letter)
          {
            hangmanCanvas.writeCorrectLetter(i);
            if(hangman.checkWinner())
            {
              hangmanCanvas.winner();
              this.resetGame();
              return;
            }
          }
        }
      }
      else
      {
        hangman.addWrongLetter(l_letter);
        hangmanCanvas.writeWrongLetter(l_letter, hangman.errorsLeft);
        hangmanCanvas.drawHangman(hangman.errorsLeft);

        if(hangman.checkGameOver())
        {
          hangmanCanvas.gameOver();
          this.resetGame();
        }
      }
    }
  }
});

function resetGame()
{
  hangmanCanvas = null;
  hangman = null;
  playing = false;
}