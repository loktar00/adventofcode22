const fs = require('fs')

fs.readFile('data.txt', 'utf8' , (err, data) => {
    const testData = data.split('');

    for (let i = 13; i < testData.length; i++) {
        const check = testData.slice(i - 13, i + 1);
        console.log(check)
        const unique = new Set(check);
        if (unique.size === check.length) {
           console.log(startOfSignal = i + 1);
            break
        }
    }
});