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

const scoreTrees = (trees) => {
    // brute force SOOoo bad
    trees.forEach((tree, idx) => {
        for (let t = 0; t < tree.length; t++) {
            let score = 0;
            for (let i = t + 1; i < tree.length; i++) {

                if (tree[i] < tree[t]) {
                    score++;
                } else {
                    score++;
                    foundTrees[idx][t].push(score);
                    break;
                }

                if (i === tree.length - 1) {
                    foundTrees[idx][t].push(Number(score));
                }
            }

            if (t === tree.length - 1) {
                foundTrees[idx][t].push(0);
            }
        }
    });
}


fs.readFile('data.txt', 'utf8' , (err, data) => {

    let trees = [];

    [...data.replace(/[\r]/g, '').split('\n')].forEach((data) => {
       const lines = data.split('').map((line) => Number(line));
       trees.push(lines);

       const blankData = new Array(lines.length).fill(0).map(el => []);
       foundTrees.push(blankData);
    });

    scoreTrees(trees);
    // Rotate the array each time
    for (let i = 0; i <= 2; i++) {
        trees = rotate2DArray(trees);
        foundTrees = rotate2DArray(foundTrees);
        scoreTrees(trees);
    }

    const scoreList = foundTrees.map((tree) => {
        return tree.map((score) => score.reduce((a, b)=> a*b, 1));
    });

    console.log(scoreList.flat().sort((a, b) => b - a))
});
