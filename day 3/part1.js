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


// Post mortem.
// After doing my one line version I realized a better approach would be to just compare the first part of the string with the second part split into individual elements, ala
// 'abCd'.split('') => filter('sdkfjksdl;fjksd;jf'.includes['a', 'b', 'C', 'd'] ..etc.);
// reduces the need for 2 sets of elements.