const fs = require('fs')

fs.readFile('data.txt', 'utf8' , (err, data) => {
    const testData = data.split('');

    for (let i = 3; i < testData.length; i++) {
        const check = testData.slice(i - 3, i + 1);
        const unique = new Set(check);
        if (unique.size === check.length) {
           console.log(startOfSignal = i + 1);
            break
        }
    }
});