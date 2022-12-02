const fs = require('fs')

// Brute force
const scoring = {
    a: {
       x: 4,
       y: 8,
       z: 3
    },
    b: {
        x: 1,
        y: 5,
        z: 9
    },
    c: {
        x: 7,
        y: 2,
        z: 6
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
