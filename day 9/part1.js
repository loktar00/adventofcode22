const fs = require('fs')


// Solution in html
fs.readFile('data.txt', 'utf8' , (err, data) => {

    const directionOutput = [];

    [...data.replace(/[\r]/g, '').split('\n')].forEach((data) => {
       const directions = data.split(' ');
       new Array(+directions[1]).fill(0).forEach(dir => directionOutput.push(directions[0].toLowerCase()));
    });

    // Paste result into solution data
    console.log(directionOutput.join(','))
});
