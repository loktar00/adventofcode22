// https://adventofcode.com/2022/day/3/input
[...document.querySelector('pre').textContent.split(/\n/)].reduce((acc, cur) => {return acc + Number(cur.substring(0, cur.length / 2).split('').filter(i => cur.substring(cur.length / 2).includes(i)).splice(0,1).map(i => {c=i.charCodeAt(0);(c < 97) ? c += -38 : c -= 96; return c;}));}, 0);
