//declare global vars
var painted;
var content;
var winningCombinations;
var turn;
var theCanvas;
var c;
var cxt;
var squaresFilled;
var w;
var y;
var theAnswer;
var compTurn;
var spot;
var spot1;
var filled;
var win;

//instantiate the arrays
window.onload = function(){
	turn = 0;
	squaresFilled = 0;
	compTurn = 0;
	spot = 0;
	spot1 = 0;
	filled = 0;
	win = 0;

	drawBoard();
	painted = new Array();
	content = new Array();
	winningCombinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8],[0,4,8], [2,4,6]];

	for(var i=0; i<=8; i++){
		painted[i] = false;
		content[i] = '';
	}
}

//draw the board
function drawBoard(){
	body = document.getElementsByTagName("body")[0];
	for(var i=0; i<9; i++){
		var x = document.createElement("canvas");
		x.height = 50;
		x.width = 50;
		x.style.border = "1px solid #f3973e";
		x.id = "canvas" + i;

		var ourCanvasClickMaker = function(index){
			return function(){
				console.log ("calling canvasClicked with" + index);
				if (compTurn == 1) {
					spot = -1;
					while(spot == -1) {
						startPlayer(index);
              // if spot is taken exit the routine
              if (spot == -1 || filled == 1 || win == 1) {
              	return;
              }
          }

          while(painted[index] == true) {
          	index = Math.floor(Math.random() * 9);
          }
          console.log(index);
          startComputer(index);

      } else {
      	spot1 = -1;
             //it's a player turn
             while(spot1 == -1) {
             	startComputer(index);
              // if spot is taken exit the routine
              if (spot1 == -1 || filled == 1 || win == 1) {
              	return;
              }
          }

          // it's comp move
          while(painted[index] == true) {
          	index = Math.floor(Math.random() * 9);
          }
          console.log(index);
          startPlayer(index);
      }
  };
};

x.onclick = ourCanvasClickMaker(i);

body.appendChild(x);
if (i == 2 || i == 5){
	var br = document.createElement("br");
	body.appendChild(br);
}

}
}

//Game Methods

//get player X or O
function getPlayer(whatPlayer){
	theAnswer = whatPlayer.value;
	document.getElementById('question').style.display = 'none';
	if (theAnswer != "x") {
		startComputer(Math.floor(Math.random() * 8));
		return;
	} else {
		alert("make your first X move");
	}
}


// Computer plays
function startComputer(canvasNumber) {
	theCanvas = "canvas"+canvasNumber;
	c = document.getElementById(theCanvas);
	cxt = c.getContext("2d");

    //draw X if box is empty
    if(painted[canvasNumber] == false){
    	if(turn%2==0){
    		cxt.beginPath();
    		cxt.moveTo(15,15);
    		cxt.lineTo(30,30);
    		cxt.moveTo(30,15);
    		cxt.lineTo(15,30);
    		cxt.stroke();
    		cxt.closePath();
    		content[canvasNumber] = 'X';                
    	}
    	turn++;
    	compTurn++;
    	spot1 = 0;
    	painted[canvasNumber] = true;

    	squaresFilled++;
    	checkForWinners(content[canvasNumber]);

    	if(squaresFilled == 9){
    		filled = 1;
    		document.getElementById('gameover').innerHTML += "Game Over!!!";
    		document.getElementById('result').style.display = 'block';
            //alert("Game Over");
            //location.reload(true);
        } 
    }
    else {
    	alert("That spot's taken!");
    	return;
    }
}

function startPlayer(index){
	theCanvas = "canvas"+index;
	c = document.getElementById(theCanvas);
	cxt = c.getContext("2d");

    //draw O if box is empty
    if(painted[index] == false){
    	if(turn%2!=0){
    		cxt.beginPath();
    		cxt.arc(25,25,8,0,Math.PI*2,true);
    		cxt.stroke();
    		cxt.closePath();
    		content[index] = 'O';               
    	}
    	turn++;
    	compTurn--;
    	spot = 0;
    	painted[index] = true;

    	squaresFilled++;
    	checkForWinners(content[index]);

    	if(squaresFilled == 9){
    		filled = 1;
    		document.getElementById('gameover').innerHTML += "Game Over!!!";
    		document.getElementById('result').style.display = 'block';
            //alert("Game Over");
            //location.reload(true);
        } 
        
    }
    else{
    	alert("That spot's taken!");
    	return;
    }
}

function checkForWinners(symbol){
	for(var a = 0; a < winningCombinations.length; a++){
		if(content[winningCombinations[a][0]] == symbol && content[winningCombinations[a][1]] == symbol && content[winningCombinations[a][2]] == symbol){
            win = 1;
            document.getElementById('winner').innerHTML += symbol + " won!";
            document.getElementById('result').style.display = 'block';
        }
    }
}

function Reset() {
	location.reload(true);
}



