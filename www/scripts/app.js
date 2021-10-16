let resolution = 10 // px per case of the field

let interval = undefined;

let size2cell = (size, resolution) => Math.floor(size / resolution);

let table_size = {
    width: size2cell(window.innerWidth, resolution),
    height: size2cell(window.innerHeight, resolution)
}

let initial_pos = {
    x: Math.floor(table_size.width / 2),
    y: Math.floor(table_size.height / 2)
};

let field = document.getElementById('field');

createTable(field, {
    n_col: table_size.width,
    n_row: table_size.height
});

function createTable(parent, { n_col, n_row }) {
    let table = document.createElement('table');
    for (let j = 0; j < n_row; j++) {
        let row = document.createElement('tr');
        for (let i = 0; i < n_col; i++) {
            let cell = document.createElement('td');
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    parent.appendChild(table);
}

let table = field.firstChild;

function forEachCell(table, action) {
    let rows = table.childNodes;
    for (row of rows) {
        let cells = row.childNodes;
        for (cell of cells) {
            action(cell);
        }
    }
}

forEachCell(table, (cell) => cell.classList.add('cell'));

let myAnt = new Ant({x: initial_pos.x, y: initial_pos.y}, table);

myAnt.draw();

function next() {
    myAnt.update();
    myAnt.draw();
}

function ant_start() {
    let dt = 1 / document.getElementById('speed').value;
    interval = setInterval(next, 100);
}

function ant_stop() {
    clearInterval(interval);
}

function ant_next() {
    next();
    if (myAnt.isOut(table_size.width, table_size.height)) {
        ant_stop();
    }
}

function ant_reset() {
    forEachCell(table, (cell) => cell.classList.remove('up'));
    myAnt.resetPos({x: initial_pos.x, y: initial_pos.y});
    myAnt.draw();
}


function setUpSpeed(speed_value) {
    let dt = 1 / speed_value * 1000;
    clearInterval(interval);
    setInterval(ant_next, dt);
}
