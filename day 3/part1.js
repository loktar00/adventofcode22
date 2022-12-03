const fs = require('fs')


fs.readFile('data.txt', 'utf8' , (err, data) => {
    let score = 0;
    [...data.replace(/[\r]/g, '').split('\n')].forEach((data) => {
        const sack1 = data.slice(0, data.length / 2).split('');
        const sack2 = data.slice(data.length / 2).split('');;

        const dupe = sack1.filter(item => sack2.includes(item));

        let value = dupe[0].charCodeAt(0);
        if (value > 65 && value < 97) {
            value = value + 27 - 65;
        } else {
            value -= 96;
        }

        score += value;
    });

    console.log(score);;

});
