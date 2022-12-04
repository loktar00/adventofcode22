//https://adventofcode.com/2022/day/4/input
[...document.querySelector('pre').textContent.split(/\n/)]
    .filter(group => group && group.split(',')
    .map(i => i.split('-')
    .map(i => Number(i))
    .some((el, _, arr) => {
        console.log(arr[1][0], el[0])
        return (arr[1][0] <= el[0] && arr[1][1] >= el[1]) || (el[0] <= arr[1][0] && el[1] >= arr[1][1])
    })
)).length;
