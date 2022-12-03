const fs = require('fs')


fs.readFile('data.txt', 'utf8' , (err, data) => {
    let score = 0;
    const lines = [...data.replace(/[\r]/g, '').split('\n')];

    for (let elf = 0; elf < lines.length; elf += 3) {
        const elf1 = lines[elf].split('');
        const elf2 = lines[elf + 1].split('');
        const elf3 = lines[elf + 2].split('');
        const badge = elf1.filter(item => elf2.includes(item)).filter(item => elf3.includes(item));

        let value = badge[0].charCodeAt(0);
        if (value > 65 && value < 97) {
            value = value + 27 - 65;
        } else {
            value -= 96;
        }

        score += value;
    }

    console.log(score);
});
