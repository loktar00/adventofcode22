const fs = require('fs')

// Brute force again.
const scoring = {
    a: {
       x: 3,
       y: 4,
       z: 8
    },
    b: {
        x: 1,
        y: 5,
        z: 9
    },
    c: {
        x: 2,
        y: 6,
        z: 7
    }
}

fs.readFile('data.txt', 'utf8' , (err, data) => {
    let score = 0;

    [...data.replace(/[\r]/g, '').split('\n')].forEach((data) => {
       const values = data.split(' ');
       score += scoring[values[0].toLowerCase()][values[1].toLowerCase()];
    });

    console.log(score);
});
