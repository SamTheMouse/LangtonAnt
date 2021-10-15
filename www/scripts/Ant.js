// cell states
const UP = true;
const DOWN = false;

const RIGHT = 1;
const LEFT = -1;

let dir = {
    NORTH: [-1, 0],
    EAST: [0, 1],
    SOUTH: [1, 0],
    WEST: [0, ]
}

let cardinals = [dir.NORTH, dir.EAST, dir.SOUTH, dir.WEST];

class Ant {
    constructor ({x, y}, field) {
        this.pos = [x, y];
        this.dir = this.randomHeading();
        this.field = field;
    }

    randomHeading () {
        let random_index = Math.floor(Math.random() * cardinals.length);
        let heading = cardinals[random_index];
        return heading;
    }

    updateHeading (cell_state) {
        let current_heading = this.dir;
        if (cell_state == UP) {
            this.rotate(LEFT);
        } else {
            this.rotate(RIGHT);
        }
    }
    
    rotate (direction) {
        let cardinal_step = direction;
        let former_cardinal = this.dir;
        let former_index = cardinals.indexOf(former_cardinal);
        let new_index = (former_index + cardinal_step) % cardinals.length;
        let new_cardinal = cardinals[new_index];
        this.dir = new_cardinal;
    }

    forward () {
        let dx = this.dir[0];
        let dy = this.dir[1];
        this.pos[0] += dx;
        this.pos[1] += dy;
    }

    update () {
        let pos = {...this.pos};
        let cell = this.field[this.pos.y][this.pos.x];
        this.updateHeading(cell);
        this.forward();
        this.field[pos.y][pos.x] = switchCellState(cell);
    }

    isOut(field_width, field_height) {
        return this.pos.x < 0 || this.pos.y < 0 || this.pos.x > field_width || this.pos.y > field_height;
    }
}

function switchCellState(cell_state) {
    return cell_state == UP ? DOWN : UP;
}