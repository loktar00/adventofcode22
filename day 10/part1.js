const fs = require('fs')

fs.readFile('data.txt', 'utf8' , (err, data) => {
    let register = 1;
    let cycles = 1;
    let sum = [];

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
            if (cycles > 20) {
                if (!((cycles - 20) % 40)) {
                    console.log(cycles, cycles * register);
                    sum.push(cycles * register)
                }
            } else if (cycles === 20) {
                console.log(cycles, cycles * register)
                sum.push(cycles * register)
            }
        }
        register += registerVal;
    });

    console.log(sum.reduce((a, b) => a + b, 0));

});
