let resolution = 10 // px per case of the field

let default_cell_state = DOWN;

let size2cell = (size, resolution) => Math.floor(size / resolution);

const table_size = {
    width: size2cell(window_size.innerWidth, resolution),
    height: size2cell(window_size.innerHeight, resolution)
}

let field_table = createFieldTable(resolution, {width: table_size.width, height: table_size.height});

const initial_pos = {
    x: Math.floor(field_table[0].length / 2),
    y: Math.floor(field_table.length / 2)
}

let field_element = document.getElementById('field');

let interval = undefined;

field_element = createHtmlTable(field_element, field_table);

let myAnt = new Ant({x: initial_pos.x, y: initial_pos.y}, field_element);

drawAnt({x: myAnt.pos.x, y: myAnt.pos.y}, field_element);

function createFieldTable(resolution, {n_col: width, n_row: height} ) {
    let table = []
    for (let j = 0; j < n_row; j++) {
        let row = [];
        for (let i = 0; i < n_col; i++) {
            let cell = default_cell_state;
            row.push(cell);
        }
        table.push(row);
    }
    return table;
}

function createHtmlTable(field_element, field_table) {   
    for (let i = 0; i < field_table.length; i++) {
        let row_element = document.createElement('tr');
        for (let j = 0; j < field_table[i].length; j++) {
            let cell_element = document.createElement('td');
            cell_element.classList.add('cell');
            row_element.appendChild(cell_element);
        }
        field_element.appendChild(row_element);
    }
}

function UpdateHtmlTable(field_element, table_field) {
    let j = 0;
    const max_j = field_table.length;
    const max_i = field_table[0].length;
    field_element.childNodes.forEach(tr => {
        let i = 0;
        tr.childNodes.forEach(td => {
            if (i < max_i && j < max_j) {
                // console.log(`cell at (${i}, ${j})`);
                let cell = table_field[j][i];
                if (isUp(cell))
                {
                    if (! td.classList.contains('up')) {
                        td.classList.add('up');
                    }
                } else {
                    td.classList.remove('up');
                }
                i++;
            } else {
                return;
            }
        });
        j++;
    });
}

function isUp(cell) {
    return cell == UP;
}

function drawAnt({x, y}, field_element) {
     
    let previous_ant = document.getElementById('ant');
    if (previous_ant != null) {
        // clear previous ant
        previous_ant.removeAttribute('id');
    }
    let next_ant_cell = field_element.childNodes[y].childNodes[x];
    // draw new ant
    next_ant_cell.id = 'ant';
}

function nextState() {
    myAnt.update();
    drawAnt(myAnt.pos, field_element);
    UpdateHtmlTable(field_element, field_table);
    if (myAnt.isOut(field_table[0].length, field_table.length)) {
        window.clearInterval(loop);
    }
}

function ant_start() {
    interval = setInterval(nextState, 10);
}


function ant_stop() {
    clearInterval(interval);
}


function ant_next() {
    nextState();
}

function ant_reset() {
    field_table = createFieldTable(resolution, size.x, size.y);
    myAnt = new Ant(initial_pos.x, initial_pos.y, field_table);
    UpdateHtmlTable(field_element, field_table);
    drawAnt(myAnt, field_element);
}