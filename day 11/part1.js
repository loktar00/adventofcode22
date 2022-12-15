const fs = require('fs')

let monkeys = {};

fs.readFile('data.txt', 'utf8' , (err, data) => {
    let currentMonkey = '';
    [...data.replace(/[\r]/g, '').split('\n')].forEach((data, idx) => {
        const lineIndex = (idx + 1) % 7;

        switch (lineIndex) {
            case 1:
                currentMonkey = data.split(':')[0].toLowerCase();
                monkeys[currentMonkey] = {inspected: 0};
                break;
            case 2:
                let items = data.split(':')[1].split(', ').map((item) => Number(item));
                monkeys[currentMonkey].items = [...items];
                break;
            case 3:
                let operation = data.split(':')[1];
                monkeys[currentMonkey].operation = operation.split('=')[1];;
                break;
            case 4:
                let tester = data.split(':')[1].split('divisible by')[1];
                monkeys[currentMonkey].tester = `%${Number(tester)}`;
                break;
            case 5:
                const ifTrueMonkey = data.split(':')[1].split(' ')[4];
                monkeys[currentMonkey].ifTrue = `monkey ${ifTrueMonkey}`;
                break;
            case 6:
                const ifFalseMonkey = data.split(':')[1].split(' ')[4];
                monkeys[currentMonkey].ifFalse = `monkey ${ifFalseMonkey}`;
                break;
        }
    });

    const rounds = 20;

    for (let r = 0; r < rounds; r++) {
        for (let monkey in monkeys) {
            const curMonkey = monkeys[monkey];
            for (let i = 0; i < curMonkey.items.length; i++) {
                const itemValue = curMonkey.items[i];
                const operation = curMonkey.operation.replaceAll('old', itemValue);
                let worry = eval(operation);
                worry = ~~(worry /= 3);

                curMonkey.items[i] = worry;
                // test
                if (!eval(`${worry}${curMonkey.tester}`)) {
                    monkeys[curMonkey.ifTrue].items.push(worry);
                } else {
                    monkeys[curMonkey.ifFalse].items.push(worry);
                }
            }
            curMonkey.inspected += curMonkey.items.length;
            curMonkey.items = [];
        }
        console.log(`round ${r}`, monkeys)
    }

    const inspected = Object.entries(monkeys).map(([key, value]) => value.inspected);
    console.log(inspected.sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b, 1));
});