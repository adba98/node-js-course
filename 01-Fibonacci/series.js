const fs = require('fs');

let createSeries = (amount) => {
  return new Promise((resolve, reject) => {
    let pivot1 = 1;
    let pivot2 = 1;
    let series = `${pivot1}`;

    for (let i = 2; i <= amount; i++) {
      series += `\t${pivot2}`;
      pivot2 = pivot1 + pivot2;
      pivot1 = pivot2 - pivot1;
    }

    fs.writeFile('result.txt', series, (err) => {
      if (err) reject('Error loading file');
      else resolve('The file has been saved');
    });
  });
};

module.exports = {
  createSeries,
};
