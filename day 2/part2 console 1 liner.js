// for console on https://adventofcode.com/2022/day/2/input

[...document.querySelector('pre').textContent.split(/\n/)].reduce((acc, cur)=>{scores = {'A X':3,'A Y':4,'A Z':8,'B X':1,'B Y':5,'B Z':9,'C X':2,'C Y':6,'C Z':7};return acc + (scores[cur] || 0)}, 0);