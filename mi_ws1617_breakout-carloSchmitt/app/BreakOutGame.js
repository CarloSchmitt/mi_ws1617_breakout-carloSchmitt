var breakOutGame = (function () {

	// private vars and constants
	var privateContext;
	var privateCanvas;

	//my canvas width and height
	var GAME_WIDTH = 600;
	var GAME_HEIGHT = 500;

	var BRICK_ROWS = 5;
	var BRICK_COLUMNS = 13;

	var BALLSIZE = 10;

	var BRICK_WIDTH = 40;
	var BRICK_HEIGHT = 10;

	var PADDLE_WIDTH = 60;
	var PADDLE_HEIGHT = 10;

	var bricks = [];
	var bricksColor;
	var xPosBricks = 10;
	var yPosBricks = 0;
	var brickcounter = BRICK_COLUMNS * BRICK_ROWS;

	var paddle;
	var paddleColor = "white";
	var xPosPaddle = (GAME_WIDTH - PADDLE_WIDTH) / 2;
	var yPosPaddle = GAME_HEIGHT - 40;

	var ball;
	var ballColor = "white";
	var xPosBall = 10;
	var yPosBall = 110;
	var xSpeed = Math.floor((Math.random() * (3 - 1) + 1) + 1);
	var ySpeed = Math.floor((Math.random() * (3 - 1) + 1) + 1);

	var score = 0;

	function privateDraw() {
		//console.log("Drawing!");
		privateContext.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

		drawBricks();
		drawPaddle();
		drawBall();

		checkCollisions();
		checkBrickCollision();

		drawScore();
		checkWin();
		checkGameOver();

		updateBall();

		window.requestAnimationFrame(privateDraw);
	}

	function privateSetContext(canvas) {
		privateCanvas = canvas;
		privateCanvas.addEventListener("mousemove", updatePaddlePosition);
		privateContext = canvas.getContext("2d");
	}

	function privateSetDifficulty(difficulty) {
		var difficult = document.getElementById("difficulty");
		var difficultselect = difficult.options[difficult.selectedIndex].value;

		if (difficultselect == "easy") {
			console.log("Leicht wurde bestätigt");
			xSpeed = 2;
			ySpeed = 2;
		}
		if (difficultselect == "middle") {
			console.log("Mittel wurde bestätigt");
			xSpeed = 3;
			ySpeed = 3;
		}
		if (difficultselect == "hard") {
			console.log("Schwer wurde bestätigt");
			xSpeed = 4;
			ySpeed = 4;
		}
	}

	function privateSetButton(button) {
		$("#startButton").on("click", selectButton);
	}

	function selectButton() {
		console.log("Button gedrückt, huraaaa!");
		privateSetDifficulty(difficulty);

		$("#breakoutcanvas").show();

		$("#difficultyHeader").hide();
		$("#difficulty").hide();
		$("#startButton").hide();

		initBall(xPosBall, yPosBall, ballColor, BALLSIZE, xSpeed, ySpeed, privateContext);

		window.requestAnimationFrame(privateDraw);
	}

	function publicInit(canvas, difficulty, button) {
		//alert("Breakout, here we go!");
		$("#breakoutcanvas").hide();

		privateSetButton(button);
		privateSetContext(canvas);

		initBricks();
	}

	function initBricks() {
		for (var r = 0; r < BRICK_ROWS; r++) {
			yPosBricks = r * (BRICK_HEIGHT + 5);
			yPosBricks += 10;
			bricks[r] = [];

			for (var c = 0; c + BRICK_WIDTH < GAME_WIDTH; c++) {
				if (r <= 1) {
					bricksColor = "red";
				}
				if (r == 2) {
					bricksColor = "yellow";
				}
				if (r == 3) {
					bricksColor = "orange";
				}
				if (r > 3) {
					bricksColor = "green";
				}
				var brick = new Brick(privateContext, xPosBricks, yPosBricks, bricksColor, BRICK_WIDTH, BRICK_HEIGHT);

				bricks[r][c] = brick;

				xPosBricks += 5 + BRICK_WIDTH;
			}
			xPosBricks = 10;
		}
	}

	function checkGameOver() {
		var checker = ball.GameOver(GAME_HEIGHT);

		if ((checker == true) && (brickcounter != 0)) {
			privateContext.beginPath();
			privateContext.textAlign = "center";
			privateContext.textBaseline = "middle";
			privateContext.fillStyle = "green";
			privateContext.font = "30px Roboto Condensed Light";
			privateContext.fillText("GAME OVER! Please refresh for restart.", GAME_WIDTH / 2, GAME_HEIGHT / 2);
			privateContext.closePath();
		}
	}

	function checkWin() {
		if (brickcounter == 0) {
			ySpeed = 0;
			xSpeed = 0;
			privateContext.beginPath();
			privateContext.textAlign = "center";
			privateContext.textBaseline = "middle";
			privateContext.fillStyle = "yellow";
			privateContext.font = "30px Roboto Condensed Light";
			privateContext.fillText("YOU WIN! Please refresh for restart.", GAME_WIDTH / 2, GAME_HEIGHT / 2);
			privateContext.closePath();
		}
	}

	function checkBrickCollision() {
		for (var r = 0; r < BRICK_ROWS; r++) {
			for (var c = 0; c < BRICK_COLUMNS; c++) {
				if (bricks[r][c] == null) {
					//do nothing
				} else {
					var collisionChecker = bricks[r][c].checkBallCollision(ball, ySpeed);
					if (collisionChecker) {
						bricks[r][c] = null;
						brickcounter--;
						score++;
						break;
					}
				}
			}
		}
	}

	function drawBricks() {
		for (var r = 0; r < BRICK_ROWS; r++) {
			for (var c = 0; c < BRICK_COLUMNS; c++) {
				if (bricks[r][c] == null) {
					//do nothing
				} else {
					bricks[r][c].draw();
				}
			}
		}
	}

	function drawPaddle() {
		paddle = new Paddle(privateContext, xPosPaddle, yPosPaddle, paddleColor, PADDLE_WIDTH, PADDLE_HEIGHT);

		paddle.draw();

		window.requestAnimationFrame(updatePaddlePosition);
	}

	function updatePaddlePosition(event) {
		var updateX = event.clientX;
		paddle.updateXPos(updateX);

		if (updateX > PADDLE_WIDTH / 2 && updateX < GAME_WIDTH - PADDLE_WIDTH / 2) {
			xPosPaddle = updateX - PADDLE_WIDTH / 2;
		}
	}

	function initBall(initalXPos, initialYPos, ballColor, ballsize, xSpeed, ySpeed, context) {
		ball = new Ball(initalXPos, initialYPos, ballColor, BALLSIZE, xSpeed, ySpeed, privateContext)
	}

	function drawBall() {
		ball.draw();
	}

	function updateBall() {
		ball.update();
	}

	function checkCollisions() {
		ball.checkWallCollision(GAME_WIDTH, GAME_HEIGHT);
		paddle.checkPaddleCollision(ball);
	}

	function drawScore() {
		privateContext.beginPath();
		privateContext.textAlign = "center";
		privateContext.textBaseline = "middle";
		privateContext.fillStyle = "white";
		privateContext.font = "30px Roboto Condensed Light";
		privateContext.fillText("Score: " + score, GAME_WIDTH/2, (GAME_HEIGHT/2)+50);
		privateContext.closePath();
	}

	return {
		init: publicInit
	};

})();

var button = document.getElementById("startButton");
var canvas = document.getElementById("breakoutcanvas");
var difficulty = document.getElementById("difficulty");
breakOutGame.init(canvas, difficulty, button);