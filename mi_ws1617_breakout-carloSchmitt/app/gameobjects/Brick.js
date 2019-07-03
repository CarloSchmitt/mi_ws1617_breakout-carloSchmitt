/* A Brick in the game */
var Brick = function (context, xPos, yPos, color, width, height) {

	this.context = context;
	this.xPos = xPos;
	this.yPos = yPos;
	this.color = color;
	this.width = width;
	this.height = height;

};

Brick.prototype.draw = function (context) {
	this.context.beginPath();
	this.context.rect(this.xPos, this.yPos, this.width, this.height);
	this.context.fillStyle = this.color;
	this.context.fill();
	this.context.closePath();
};

Brick.prototype.checkBallCollision = function (ball, ySpeed) {
	var BALL_SPEED = ySpeed;
	var topBorderBall = ball.yPosBall - ball.radius;
	var bottomBorderBall = ball.yPosBall + ball.radius;
	var rightBorderBall = ball.yPosBall + ball.radius;
	var leftBorderBall = ball.yPosBall - ball.radius;

	if (topBorderBall <= this.yPos + this.height) {
		if ((ball.xPosBall >= this.xPos - ball.radius) && (ball.xPosBall <= (this.xPos + this.width) + ball.radius)) {
			ball.bounceHorizontally();
			return true;
		}
	}
};