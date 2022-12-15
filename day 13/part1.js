const fs = require('fs')

fs.readFile('data.txt', 'utf8' , (err, data) => {
    [...data.replace(/[\r]/g, '').split('\n')].forEach((data, idx) => {
        console.log(data)
    });
});