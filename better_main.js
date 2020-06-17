const FRAMERATE = 100;
let SIZE;

let grid = []
let = stack = [];
let currentCell;
let nextCell;
let rows;
let cols;

function setup() {
	createCanvas(500, 500)
	background(51)
	SIZE = height/40
	rows = floor(height / SIZE) 
	cols = floor(width / SIZE)

	let counter = 0;
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			let cell = new Cell(x, y, counter);
			grid.push(cell);
			counter++;
		}	
	}
	currentCell = grid[0];
	console.log(grid)
	frameRate(FRAMERATE)

}

function draw() {
	grid.forEach(cell => {
		noStroke();
		cell.show();
	});

	currentCell.visited = true;
	currentCell.activeCell();
	nextCell = currentCell.randNeighbor();
	if (nextCell) {
		stack.push(currentCell);
		removeWalls(currentCell, nextCell);
		currentCell = nextCell;
	} else if (stack.length > 0) {
		currentCell = stack.pop();
	}

}

function Cell(x, y, index) {
	this.x = x;
	this.y = y;
	this.visited = false;
	this.index = index;
	this.walls = {
		top: true,
		right: true,
		bottom: true,
		left: true
	}

	this.randNeighbor = function() {
		let validNeighbors = [];
		coords = [
			[this.x		, this.y-1],
			[this.x+1	, this.y],
			[this.x		, this.y+1],
			[this.x-1	, this.y] 
		];

		coords.forEach(n => {
			let curr = grid[getIndex(n[0], n[1])]
			if (curr && !curr.visited) {
				validNeighbors.push(curr);
			}
		});

		if (validNeighbors.length > 0) {
			let rand = floor(random(0, validNeighbors.length));
			return validNeighbors[rand]
		} else { return undefined }

	}

	this.activeCell = function () {
		noStroke(); fill(0, 0, 255, 100); rect(this.x*SIZE, this.y*SIZE, SIZE, SIZE);
	}

	this.show = function() {
		let x_c = x * SIZE;
		let y_c = y * SIZE;

		stroke(255);
		if (this.walls.top) 		{ line(x_c			, y_c			, x_c+SIZE, y_c) };
		if (this.walls.right) 	{ line(x_c+SIZE	, y_c			, x_c+SIZE, y_c+SIZE) };
		if (this.walls.bottom) 	{ line(x_c+SIZE	, y_c+SIZE, x_c			, y_c+SIZE) };
		if (this.walls.left) 		{ line(x_c			, y_c+SIZE, x_c			, y_c) };

		if (this.visited)				{ noStroke(); fill(51); rect(x_c, y_c, SIZE, SIZE) }
	}
}


function removeWalls(current, neighbor) {
	let xDiff = current.x - neighbor.x;
	let yDiff = current.y - neighbor.y;
	
	if (xDiff === 1) 				{current.walls.left = neighbor.walls.right = false; }
	else if (xDiff === -1) 	{ current.walls.right = neighbor.walls.left = false; }

	if (yDiff === 1) 				{ current.walls.top = neighbor.walls.bottom = false }
	else if (yDiff === -1) 	{ current.walls.bottom = neighbor.walls.top = false }
}

function getIndex(x, y) {
	if (x < 0 || y < 0 || x > cols-1 || y > rows-1) {
		return -1
	} else { return x + y*cols; }
}

