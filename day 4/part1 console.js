//https://adventofcode.com/2022/day/4/input
[...document.querySelector('pre').textContent.split(/\n/)].filter(group => {
    if (!group) return;
    const section = group.split(',').map(i => i.split('-').map(i => Number(i)));
    return ((section[1][0] <= section[0][0] && section[1][1] >= section[0][1]) || (section[0][0] <= section[1][0] && section[0][1] >= section[1][1]));
}).length;
