const fs = require('fs')

fs.readFile('data.txt', 'utf8' , (err, data) => {
    let register = 1;
    let cycles = 0;
    let screen = [[]];
    let spriteX = 1;
    let row = 0;

    [...data.replace(/[\r]/g, '').split('\n')].forEach((data) => {
        let cycleCount = 0;
        const op = data.split(' ')[0];
        let registerVal = 0;

        switch (op) {
            case 'noop':
                cycleCount = 1;
                break;
            case 'addx':
                cycleCount = 2;
                registerVal = Number(data.split(' ')[1]);
                break;
        }

        for (let i = cycles; cycles <= (i + cycleCount) - 1; cycles++) {
            if (!(cycles % 40)) {
                row ++;
                screen[row] = [];
            }

            let xPos = cycles % 40;
            if (xPos === spriteX -1 || xPos === spriteX + 1 || xPos === spriteX) {
                screen[row].push('#');
            } else {
                screen[row].push('.');
            }
        }

        spriteX += registerVal;
    });

    screen.forEach((row) => console.log(row.join('')))
});
