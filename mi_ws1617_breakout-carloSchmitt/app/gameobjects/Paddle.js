/* Paddle represents the players paddle used to deflect the ball in the game */
var Paddle = function (context, xPos, yPos, color, width, height) {
	this.context = context;
	this.xPos = xPos;
	this.yPos = yPos;
	this.color = color;
	this.width = width;
	this.height = height;
};

Paddle.prototype.draw = function () {
	this.context.beginPath();
	this.context.rect(this.xPos, this.yPos, this.width, this.height);
	this.context.fillStyle = this.color;
	this.context.fill();
	this.context.closePath();
};

Paddle.prototype.updateXPos = function (newPos) {
	this.xPos = newPos;
};

Paddle.prototype.checkPaddleCollision = function (ball) {
	var bottomBorder = ball.yPosBall + ball.radius;
	var rightBorder = ball.xPosBall + ball.radius;
	var leftBorder = ball.xPosBall - ball.radius;

	if (bottomBorder >= this.yPos && bottomBorder <= this.yPos + ball.ySpeed) {
		if (leftBorder >= (this.xPos - (ball.radius * 2)) && rightBorder <= (this.xPos + this.width + (ball.radius * 2))) {
			ball.bounceHorizontally();
		}
	}

	if (leftBorder <= this.xPos + this.width && leftBorder >= this.xPos + this.width - ball.radius)
		if (ball.yPosBall >= this.yPos - ball.radius) {
			ball.bounceVertically();
		}

	if (rightBorder >= this.xPos && rightBorder <= this.xPos + ball.ySpeed) {
		if (ball.yPosBall >= this.yPos - ball.radius) {
			ball.bounceVertically();
		}
	}
};