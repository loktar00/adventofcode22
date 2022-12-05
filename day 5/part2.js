const fs = require('fs')

// I could get these by counting the number of lines between the top and the start of the numbers
// could use the numbers themselves to get the column total.
const columns = 9;
const rows = 8;

function move(arr, num, col, destCol) {
    const tempArr = [...arr];
    tempArr[destCol] = [...arr[col].splice(0, num), ...arr[destCol]];
    return tempArr;
}

fs.readFile('data.txt', 'utf8' , (err, data) => {
    const temp = [];
    const stackedLines = [...data.replace(/[\r]/g, '').split(/[\n]/g)];

    stackedLines.forEach((line, index) => {
        if (index < rows) {
            line.split('').forEach((char, idx) => {
                if ((idx + 1) % 4 === 2) {
                    temp.push(char);
                }
            });
        }
    });

    // create the stacks
    let stacks = [];
    for (i = 0; i < rows * columns; i++) {
        if (!stacks[i % columns]) stacks[i % columns] = [];
        temp[i] !== ' ' ? stacks[i % columns].push(temp[i]) : null;
    }

    // go through the directions.
    stackedLines.splice(0, rows + 2);

    stackedLines.forEach((line) => {
        const dir = line.replaceAll(' ', '').replaceAll('move', '')
        const test = dir.split(/(?:from|to)+/);
        //stacks = move(stacks, +test[0], +test[1]-1, +test[2]-1);
        stacks = move(stacks, +test[0], +test[1]-1, +test[2]-1);
    })

    const answer = stacks.map((stack) => stack[0]).join('');
    console.log(answer);
});