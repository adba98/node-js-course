const series = require('./series');

let argv = process.argv;
let amount = argv[2].split('=')[1];

series
  .createSeries(amount)
  .then((message) => console.log(message))
  .catch((message) => console.log(message));
