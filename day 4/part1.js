const fs = require('fs')

fs.readFile('data.txt', 'utf8' , (err, data) => {
    const lines = [...data.replace(/[\r]/g, '').split('\n')];
    const count = lines.filter((line) => {
        const sections = line.split(',');
        // This ate up 15 minutes since I was getting "The correct answer for somebody elses input"... was manually verifying the input oof.
        const section1 = sections[0].split('-').map((item) => Number(item));;
        const section2 = sections[1].split('-').map((item) => Number(item));;
        return ((section2[0] <= section1[0] && section2[1] >= section1[1]) || (section1[0] <= section2[0] && section1[1] >= section2[1]))
    }).length;

    console.log(count)
});