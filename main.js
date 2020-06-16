const SQUARE_SIZE = 40;
let grid = [];

function setup() {
  createCanvas(400, 400);
  background(51);
  rows = floor(height / SQUARE_SIZE);
  cols = floor(width / SQUARE_SIZE);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cell = new Cell(y, x);
      grid.push(cell);
    }
  }
  console.log(grid);
}

function draw() {
  noStroke();
  grid.forEach((cell) => {
    cell.show();
  });
}

function Cell(y, x) {
  this.y = y;
	this.x = x;
	this.walls = {
		top: true,
		right: true,
		bottom: true,
		left: true
	}

  this.show = function () {
    let i = y * SQUARE_SIZE;
    let j = x * SQUARE_SIZE;
		stroke(255);
		if (this.walls.top) {
			line(i, j, i+SQUARE_SIZE, j)
		}
		if (this.walls.right) {
			line(i, j+SQUARE_SIZE, i+SQUARE_SIZE, j+SQUARE_SIZE)
		}
		if (this.walls.bottom) {
			line(i+SQUARE_SIZE, j, i+SQUARE_SIZE, j+SQUARE_SIZE)
		}
		if (this.walls.left) {
			line(i, j, i, j+SQUARE_SIZE)
		}


    // noFill();
    // rect(i, j, SQUARE_SIZE, SQUARE_SIZE);
  };
}
