const { parseCron } = require('./src/parsers');
const { formatResults } = require('./src/utils');

const parser = () => {
  const args = process.argv.slice(2,3);
  const cronExp = args[0];
  const cron = cronExp.split(' ');
  const command = cron[cron.length -1]

  const cronObj = {
    minute: cron[0], 
    hour: cron[1],
    ['day of month']: cron[2],
    months: cron[3],
    ['day of week']: cron[4],
  };

  let results = {};

  for (const [type, value] of Object.entries(cronObj)) {
    let parsed;
    if (value) {
      parsed = parseCron(value, type);
    }
    results[type] = parsed;
  }

  console.log(formatResults(results, command));
}

parser();