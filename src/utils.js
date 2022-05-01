const cronRanges = {
  minute: {
    validMin: 0,
    validMax: 59
  },
  hour: {
    validMin: 0,
    validMax: 23
  },
  ['day of month']: {
    validMin: 1,
    validMax: 31
  },
  months: {
    validMin: 1,
    validMax: 12
  },
  ['day of week']: {
    validMin: 1,
    validMax: 7
  }
}

const isInt = (value) => {
  return !isNaN(value) && parseInt(value) == value;
}

const validateType = (type, value) => {
  const [ min, max ] = value.split('-');
  const { validMin, validMax } = cronRanges[type];
  if (min < validMin || max > validMax) {
    throw new Error(`The cron attribute ${type} can only accept values between ${validMin} - ${validMax}`)
  }
  return true
}

const formatResults = (cronObj, command) => {
  let formatted = '';
  for (const [type, arr] of Object.entries(cronObj)) {
    const values = arr.join(' ')
    formatted += `${type.padEnd(14)}${values}\n`
  }
  const commandStr = 'command';
  formatted += `${commandStr.padEnd(14)}${command}`
  return formatted;
}

const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

module.exports = {
  formatResults,
  cronRanges,
  validateType,
  isInt,
  range,
}