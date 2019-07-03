/* The ball in the game */
var Ball = function (xPosBall, yPosBall, color, radius, xSpeed, ySpeed, context) {
	this.xPosBall = xPosBall;
	this.yPosBall = yPosBall;
	this.color = color;
	this.radius = radius;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.context = context;
};

Ball.prototype.draw = function () {
	this.context.beginPath();
	this.context.arc(this.xPosBall, this.yPosBall, this.radius, 0, 2 * Math.PI, true);
	this.context.fillStyle = this.color;
	this.context.fill();
	this.context.closePath();
};

Ball.prototype.checkWallCollision = function (GAME_WIDTH, GAME_HEIGHT) {
	var topBorder = this.yPosBall - this.radius;
	var bottomBorder = this.yPosBall + this.radius;
	var rightBorder = this.xPosBall + this.radius;
	var leftBorder = this.xPosBall - this.radius;

	if (rightBorder > GAME_WIDTH || leftBorder < 0) {
		this.xSpeed *= -1;
	}
	if (topBorder < 0 || bottomBorder > GAME_HEIGHT) {
		this.ySpeed *= -1;
	}
};

Ball.prototype.update = function () {
	this.xPosBall += this.xSpeed;
	this.yPosBall += this.ySpeed;
};

Ball.prototype.GameOver = function (GAME_HEIGHT) {
	var topBorder = this.yPosBall + this.radius;

	if (topBorder >= GAME_HEIGHT) {
		this.xSpeed = 0;
		this.ySpeed = 0;
		return true;
	} else {
		return false;
	}
};

Ball.prototype.bounceHorizontally = function () {
	this.ySpeed *= -1;
};

Ball.prototype.bounceVertically = function () {
	this.xPosBall *= -1;
};