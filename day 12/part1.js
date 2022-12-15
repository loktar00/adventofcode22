const fs = require('fs')

const map = [];
const markedMap = [];

const startPos = {x: 0, y: 0};
const endPos = {x: 0, y: 0};

fs.readFile('data.txt', 'utf8' , (err, data) => {
    [...data.replace(/[\r]/g, '').split('\n')].forEach((data, idx) => {
        markedMap[idx] = new Array(data.split('').length).fill('``');
        const tileData = data.split('').map((tile, y) => {
            let val = 0;

            if (tile === 'S') {
                startPos.x = idx;
                startPos.y = y;
                val = 0;
            } else if (tile === 'E') {
                endPos.x = idx;
                endPos.y = y;
                val = 25;
            } else {
                val = tile.charCodeAt(0) - 97;
            }

            return {
                x: idx,
                y: y,
                type: val,
                g: 0,
                h: 0,
                f: 0,
                open: false,
                closed: false,
                parent: null,
            }
        });
        map[idx] = [...tileData];
    });

    // Stole my really old a* demo https://loktar00.github.io/demos-and-deviations/demos/a%20star%20algorithm/
    function pathFinding(data, start, end){
        var openList = [],
            startObj = {};

        startObj.parent = null;
        startObj.g = 0;
        startObj.h = getHur(startObj, end);
        startObj.f = startObj.g + startObj.h;
        startObj.open = true;
        startObj.x = start.x;
        startObj.y = start.y;
        startObj.type = data[start.x][start.y].type;
        openList.push(startObj);

        while(openList.length > 0){
            var curNode = openList.pop();

            if(curNode.x === end.x && curNode.y === end.y){
                // build path
                var cur = curNode,
                    path = [];

                while(cur.parent) {
                    path.push(cur);
                    cur = cur.parent;
                }
                path.push(cur);

                path.forEach((node) => {
                    markedMap[node.x][node.y] = node.type;
                });

                markedMap.forEach((row) => console.log(row.map(el => {if(el.length < 1){return `.${el}`} return el}).join(',')))
                console.log(path.length - 1);
                return true;
            }else{
                curNode.closed = true;
                curNode.open = false;

                var neighbors = getNeighbors(data, curNode);
                for(var i = 0; i < neighbors.length; i++){
                    var neighbor = neighbors[i];

                    if(neighbor.closed || neighbor.type > curNode.type + 1){
                        continue;
                    }

                    var gScore = curNode.g + 1,
                        betterGScore = false;

                    if(!neighbor.open){
                        betterGScore = true;
                        neighbor.h = getHur(neighbor, end);
                        neighbor.open = true;
                        openList.push(neighbor);
                        openList.sort(sortByF);
                    }else if(gScore < neighbor.g){
                        betterGScore = true;
                    }

                    if(betterGScore){
                        neighbor.parent = curNode;
                        neighbor.g = gScore;
                        neighbor.f = neighbor.g + neighbor.h;
                        openList.sort(sortByF);
                    }
                }
            }
        }
    }

    function getHur(pos0, pos1) {
            // This is the Manhattan distance
            var d1 = Math.abs (pos1.x - pos0.x);
            var d2 = Math.abs (pos1.y - pos0.y);
            return d1 + d2;
    }

    function getNeighbors(data, node) {
        var ret = [],
            x = node.x,
            y = node.y;

        if(data[x-1] && data[x-1][y]) {
            ret.push(data[x-1][y]);
        }
        if(data[x+1] && data[x+1][y]) {
            ret.push(data[x+1][y]);
        }
        if(data[x][y-1] && data[x][y-1]) {
            ret.push(data[x][y-1]);
        }
        if(data[x][y+1] && data[x][y+1]) {
            ret.push(data[x][y+1]);
        }
        return ret;
    }

    // sort by the g value
    function sortByF(a, b){
        var aa = a.f,
            bb = b.f;

        return ((aa < bb) ? 1 : ((aa > bb) ? -1 : 0));
    }

    pathFinding(map, startPos, endPos);
});