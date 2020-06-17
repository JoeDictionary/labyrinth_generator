const SQ_SIZE = 40;
const FRAMERATE = 1;
let grid = [];
let currentCell;
let stack = [];

function index(y, x) {
  if (y < 0 || y > cols - 1 || x < 0 || x > rows - 1) {
    return -1;
  } else {
    return x + y * cols;
  }
}

function setup() {
  createCanvas(400, 400);
  background(51);
  rows = floor(height / SQ_SIZE);
  cols = floor(width / SQ_SIZE);

	// TODO WTF!!!!!
	let counter = 0;
	for (let y = 0; y < rows; y++) {
  	for (let x = 0; x < cols; x++) {
      let cell = new Cell(x, y, counter);
			grid.push(cell);
			counter++;
    }
	}
	console.log(grid)
	
  currentCell = grid[0];
  frameRate(FRAMERATE);
}

function draw() {
  noStroke();
  grid.forEach((cell) => {
    cell.show();
	});
	
	currentCell.visited = true;
	currentCell.active()

  let neighbor = currentCell.randomNeighbor();
	
  if (neighbor) {
    neighbor.visited = true;
		stack.push(currentCell);
		removeWalls(currentCell, neighbor)
    currentCell = neighbor;
  }
  else if (stack.length > 0) {
    currentCell = stack.pop();
  }
}

function Cell(x, y, ind) {
  this.y = y;
	this.x = x;
	this.ind = ind;
  this.visited = false;
  this.walls = {
    top: true,
    right: true,
    bottom: true,
    left: true,
  };

  this.randomNeighbor = function () {
    let neighbors = [];
    coords = [
      [this.y - 1, this.x], // top
      [this.y, this.x + 1], // right
      [this.y + 1, this.x], // bottom
      [this.y, this.x - 1], // left
    ];

    coords.forEach((coord) => {
      let current = grid[index(coord[0], coord[1])];
      if (current && !current.visited) {
        neighbors.push(current);
      }
    });

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
	};
	
	this.active = function() {
		noStroke()
		fill(0, 0, 255, 100)
		rect(this.y*SQ_SIZE, this.x*SQ_SIZE, SQ_SIZE, SQ_SIZE);
	}

  this.show = function () {
    let i = x * SQ_SIZE;
    let j = y * SQ_SIZE;
    stroke(255);

    if (this.walls.top) {
      line(i, j, i + SQ_SIZE, j);
    }
    if (this.walls.right) {
      line(i + SQ_SIZE, j, i + SQ_SIZE, j + SQ_SIZE);
    }
    if (this.walls.bottom) {
      line(i + SQ_SIZE, j + SQ_SIZE, i, j + SQ_SIZE);
    }
    if (this.walls.left) {
      line(i, j + SQ_SIZE, i, j);
    }

    if (this.visited) {
      noStroke();
      fill(255, 0, 255, 50);
      rect(i, j, SQ_SIZE, SQ_SIZE);
    }
  };
}


function removeWalls(curr, neighb) {
	let xDiff = curr.x - neighb.x;
    if (xDiff === -1) {
      curr.walls.right = false;
      neighb.walls.left = false;
    } else if (xDiff === 1) {
      curr.walls.left = false;
      neighb.walls.right = false;
		}

    let yDiff = curr.y - neighb.y;
    if (yDiff === -1) {
      curr.walls.bottom = false;
      neighb.walls.top = false;
    } else if (yDiff === 1) {
      curr.walls.top = false;
      neighb.walls.bottom = false;
		}
		
		console.log({xDiff}, {yDiff})
		console.log({curr}, {neighb})
		// console.log(curr.walls)
}