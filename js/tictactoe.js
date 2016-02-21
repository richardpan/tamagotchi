"use strict";

(function () {
    var stage,
        pieces = [],
        board,
        player1ScoreLabel,
        player2ScoreLabel,
        player1Score = 0,
        player2Score = 0,
        player1Piece = 'X',
        player2Piece = 'O',
        turnNumber = 0,
        winnerExists,
    
    isWinner = function() {
        return (board[0] !== undefined && board[0] === board[1] && board[0] === board[2]) ||
            (board[3] !== undefined && board[3] === board[4] && board[3] === board[5]) ||
            (board[6] !== undefined && board[6] === board[7] && board[6] === board[8]) ||
            (board[0] !== undefined && board[0] === board[3] && board[0] === board[6]) ||
            (board[1] !== undefined && board[1] === board[4] && board[1] === board[7]) ||
            (board[2] !== undefined && board[2] === board[5] && board[2] === board[8]) ||
            (board[4] !== undefined && ((board[0] === board[4] && board[0] === board[8]) ||
                (board[2] === board[4] && board[2] === board[6])));
    },
    
    update = function() {
        winnerExists = isWinner();
        if (winnerExists) {
            if (turnNumber % 2 === 0) {
                player1Score++;
            } else {
                player2Score++;
            }
            endGame();
        } else {
            turnNumber++;
        }
        if (turnNumber === 9) {
            endGame();
        }
    },
    
    endGame = function() {
        var winner = (turnNumber % 2 === 0) ? "Player 1" : "Player 2";
        var endMessage = (winnerExists) ? winner + " wins!" : "Tie game!";
        var endGame = new createjs.Shape();
        endGame.graphics.beginFill("White").drawRect(10, 175, 300, 75);
        var label = new createjs.Text(endMessage + " Click to continue.", "20px Arial", "#ff7700");
        label.x = 25;
        label.y = 200;
        endGame.addEventListener("click", function(){
            return function(event) {
                stage.removeChild(label);
                stage.removeChild(endGame);
                startNewGame();
            };
        }());
        
        player1ScoreLabel.text = player1Score;
        player2ScoreLabel.text = player2Score;
        stage.addChild(endGame);
        stage.addChild(label);
        stage.update();
    },
    
    set = function(id, x, y) {
        var piece;
        if (turnNumber % 2 === 0) {
            piece = player1Piece;
        } else {
            piece = player2Piece;
        }
        if (!winnerExists && !board[id]) {
            board[id] = piece;
            drawShape(x, y);
            update();
        }
    },
    
    drawShape = function(x, y) {
        var shape = new createjs.Shape();
        if (turnNumber % 2 === 0)  {
            shape.graphics.beginFill("White").drawRect(x + 25, y + 25, 50, 50);
        } else {
            shape.graphics.beginFill("White").drawCircle(x + 50, y + 50, 25);
        }
        pieces.push(shape);
        stage.addChild(shape);
        stage.update();
    },
    
    createBoard = function() {
        stage = new createjs.Stage("board");
        var index = 0;
        var scoreLabel = new createjs.Text("SCORE:", "20px Arial", "#ff7700");
        scoreLabel.x = 0;
        scoreLabel.y = 25;
        scoreLabel.textBaseline = "alphabetic";
        stage.addChild(scoreLabel);
        
        player1ScoreLabel = new createjs.Text(player1Score, "20px Arial", "#ff7700");
        player1ScoreLabel.x = 0;
        player1ScoreLabel.y = 45;
        player1ScoreLabel.textBaseline = "alphabetic";
        stage.addChild(player1ScoreLabel);
        
        player2ScoreLabel = new createjs.Text(player2Score, "20px Arial", "#ff7700");
        player2ScoreLabel.x = 25;
        player2ScoreLabel.y = 45;
        player2ScoreLabel.textBaseline = "alphabetic";
        stage.addChild(player2ScoreLabel);
        
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var x = i * 100 + i * 10,
                    y = 50 + j * 100 + j * 10,
                    shape = new createjs.Shape();
                shape.graphics.beginFill("DeepSkyBlue").drawRect(x, y, 100, 100);
                shape.addEventListener("click", function(id, x, y){
                    return function(event) {
                        set(id, x, y);
                    };
                }(index, x, y));
                stage.addChild(shape);
                
                index++;
            }
        }
        
        startNewGame();
    },
    
    startNewGame = function() {
        board = new Array(9);
        turnNumber = 0;
        winnerExists = false;
        
        for (var k = 0; k < pieces.length; k++) {
            stage.removeChild(pieces[k]);
        }
        
        stage.update();
    };
    
    if (typeof window.onload === "function") {
        window.onload = function () {
            createBoard();
        };
    } else {
        window.onload = createBoard;
    }
}());