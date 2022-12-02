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


// const vals = {'AX': 3, 'AY': 4, 'AZ': 8, 'BX': 1, 'BY': 5, 'BZ': 9, 'CX': 2, 'CY': 6, 'CZ': 7}
// [...document.querySelector('pre').textContent.split(/\n/)].reduce((acc, cur)=>{scores = {'A X':3,'A Y':4,'A Z':8,'B X':1,'B Y':5,'B Z':9,'C X':2,'C Y':6,'C Z':7};return acc + (scores[cur] || 0)}, 0)