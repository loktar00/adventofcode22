const fs = require('fs')

getTheSumOfChildren = (directory) => {
    let sum = 0;
    if (directory.children) {
        for (let child in directory.children) {
            sum += getTheSumOfChildren(directory.children[child])
        }
    }
    return sum + directory.size;
}

calculateSizes = (directory, list) => {
    list.push({size: getTheSumOfChildren(directory)});
    if (directory.children) {
        for (let child in directory.children) {
            calculateSizes(directory.children[child], list)
        }
    }
    return list.filter((item) => item.size <= 100000).reduce((acc, item) => acc + item.size, 0);
}

fs.readFile('data.txt', 'utf8' , (err, data) => {
    const lines = [...data.replace(/[\r]/g, '').split('\n')];

    const directories = {'/': {size: 0, children: {}, parent: '/'}};

    let curDir = directories['/'];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('$')) {
            if (line.includes('cd')) {
                // change dir
                const directory = line.split(' ')[2];
                if (directory !== '..') {
                    if (!curDir.children[directory]) {
                        curDir.children[directory] = {size: 0, children: {}, parent: curDir};
                    }
                    curDir = curDir.children[directory];
                } else {
                    curDir = curDir.parent;
                }
            }

            if (line.includes('ls')) {
                // list
                let f = i + 1;

                while(lines[f] && !lines[f].includes('$')) {
                    const input = lines[f].split(' ');
                    if (input[0] !== 'dir') {
                        curDir.size += Number(input[0]);
                    } else {
                        curDir.children[input[1]] = {size: 0, children: {}, parent: curDir};
                    }
                    f++;
                }
                i = f - 1;
            }
        }
    }

  console.log(calculateSizes(directories['/'], []))
});