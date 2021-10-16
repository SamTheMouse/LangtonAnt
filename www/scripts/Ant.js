// cell states
const UP = true;
const DOWN = false;

const dir = {
    NORTH: [0, -1],
    EAST: [1, 0],
    SOUTH: [0, 1],
    WEST: [-1, 0]
}

const cardinals = [dir.NORTH, dir.EAST, dir.SOUTH, dir.WEST];

class Ant {
    constructor ({x, y}, table) {
        this.pos = [x, y];
        this.dir = this.randomHeading();
        this.table = table;
    }

    randomHeading () {
        let random_index = Math.floor(Math.random() * cardinals.length);
        let heading = cardinals[random_index];
        return heading;
    }

    updateHeading () {
        let cell = this.underCell;
        if (this.isUp(cell)) {
            this.rotate("LEFT");
        } else {
            this.rotate("RIGHT");
        }
    }
    
    rotate (direction) {
        // console.log(direction);
        if (direction == "RIGHT") {
            if (this.dir == dir.NORTH) {
                this.dir = dir.EAST;
            } else if (this.dir == dir.EAST) {
                this.dir = dir.SOUTH;
            } else if (this.dir == dir.SOUTH) {
                this.dir = dir.WEST;
            } else if (this.dir == dir.WEST) {
                this.dir = dir.NORTH;
            }
        } else if (direction == "LEFT") {
            if (this.dir == dir.NORTH) {
                this.dir = dir.WEST;
            } else if (this.dir == dir.WEST) {
                this.dir = dir.SOUTH;
            } else if (this.dir == dir.SOUTH) {
                this.dir = dir.EAST;
            } else if (this.dir == dir.EAST) {
                this.dir = dir.NORTH;
            }
        }
    }

    forward () {
        let dx = this.dir[0];
        let dy = this.dir[1];
        this.pos[0] += dx;
        this.pos[1] += dy;
    }

    update () {
        this.updateHeading();
        this.forward();
    } 

    draw () {
        // Get previous cell associated with and id
        let prev_cell = document.getElementById('ant');
        if (prev_cell != undefined) {
             // Remove the obsolete attribute
            prev_cell.removeAttribute('id');
        }   
        let current_cell = this.underCell;
        // console.log(current_cell);
        current_cell.id = "ant";
        this.switchCellState(current_cell);
    }
    
    isOut(table_width, table_height) {
        return this.pos.x < 0 || this.pos.y < 0 || this.pos.x > table_width || this.pos.y > table_height;
    }

    resetPos({x, y}) {
        this.pos = [x, y];
    }

    get underCell() {
        let i = this.pos[0];
        let j = this.pos[1];
        let cell = this.table.childNodes[i].childNodes[j];
        return cell;
    }

    switchCellState(cell) {
        cell.classList.toggle('up');
    }

    isUp(cell) {
        return cell.classList.contains('up');
    }
}