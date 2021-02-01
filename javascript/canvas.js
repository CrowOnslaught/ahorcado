class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.secretWord = secretWord;
  }

  createBoard() 
  {
    this.context.clearRect(0, 0, 1200, 800);
    this.drawLines();
  }

  drawLines() {
    this.context.beginPath();
    let l_x = 400;
    this.context.moveTo(l_x, 780);
    for (let i = 0; i < this.secretWord.length; i++) 
    {
      this.context.lineTo(l_x +50, 780);
      l_x +=60;
      this.context.moveTo(l_x, 780);
    }
    this.context.stroke();
  }

  writeCorrectLetter(index) 
  {
    let l_x = 420 + 60*index;
    let l_letter = this.secretWord[index];

    this.context.font = "30px Arial";
    this.context.fillText(l_letter, l_x, 750);

  }

  writeWrongLetter(letter, errorsLeft) 
  {
    let l_y = 20 + 50*(10-errorsLeft);

    this.context.font = "30px Arial";
    this.context.fillText(letter, 1100, l_y);

  }

  drawHangman(errorsLeft) 
  {
    this.context.beginPath();

    switch(errorsLeft)
    {
      case 9:
        this.moveLine(200, 740);
        this.drawLine(280,780);
        this.drawLine(120,780);
        this.drawLine(200,740);
        break;
      case 8:
        this.moveLine(200, 740);
        this.drawLine(200,100);
        break;
      case 7:
        this.moveLine(200, 100);
        this.drawLine(600,100);
        break;
      case 6:
        this.moveLine(600, 100);
        this.drawLine(600, 200);
        break;
      case 5:

        this.context.arc(600, 250, 50, 0, 2 * Math.PI);

        break;
      case 4:
        this.moveLine(600, 300);
        this.drawLine(600, 500);
        break;
      case 3:
        this.moveLine(600, 500);
        this.drawLine(520, 580);
        break;
      case 2:
        this.moveLine(600, 500);
        this.drawLine(680, 580);
        break;
      case 1:
        this.moveLine(600, 320);
        this.drawLine(680, 400);
        break;
      case 0:
        this.moveLine(600, 320);
        this.drawLine(520, 400);
        break;
        
        
    }

    this.moveLine()
    this.drawLine()
    this.context.stroke();
  }

  moveLine(x,y)
  {
    this.context.moveTo(x, y);
  }

  drawLine(x,y)
  {
    this.context.lineTo(x,y);
  }

  gameOver() 
  {
    let img = document.getElementById("gameover");
    this.context.drawImage(img, 300, 200);  
  }

  winner() 
  {
    let img = document.getElementById("awesome");
    this.context.drawImage(img, 150, 0);
  }
}
