const fs = require('fs')

let foundTrees = [];

// was able to borrow from my old tetris demo https://codepen.io/loktar00/details/BaGqXY ;)
const rotate2DArray = (arr) => {
    let rotated = [];
    const len = arr[0].length - 1;

    for (let x = 0; x < arr.length; x++) {
        rotated[x] = [];

        for (let y = 0; y <= len; y++) {
            rotated[x][y] = arr[len - y][x];
        }
    }
    return rotated;
}

const findTrees = (trees) => {
    let count = 0;
    trees.forEach((tree, idx) => {
        let height = tree[0];
        for (let i = 1; i <= tree.length - 1; i++) {
            if (tree[i] > height) {
                height = tree[i];
                foundTrees[idx][i] ++;
            } else if (tree[i] <= height) {
                continue;
            }
        }
    });

    return count;
}

fs.readFile('data.txt', 'utf8' , (err, data) => {

    let trees = [];

    [...data.replace(/[\r]/g, '').split('\n')].forEach((data) => {
       const lines = data.split('').map((line) => Number(line));
       trees.push(lines);

       const blankData = new Array(lines.length).fill(0).map(el => 0);
       foundTrees.push(blankData);
    });

    findTrees(trees);

    // Rotate the array each time
    for (let i = 0; i <= 2; i++) {
        trees = rotate2DArray(trees);
        foundTrees = rotate2DArray(foundTrees);
        foundTrees[0] = foundTrees[0].map(el => 1);
        findTrees(trees);
    }

    console.log(foundTrees.flat().filter(el => el === 1).length)
});
