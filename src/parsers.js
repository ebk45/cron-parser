const { cronRanges, validateType, isInt } = require('./utils')

const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

const rangeParser = (value) => {
  const [ min, max ] = value.split('-');
  return range(parseInt(min), parseInt(max), 1)
};

const listParser = (value) => {
  const splitValues = value.split(',')
  return splitValues.map(value => parseInt(value))
};

const frequencyParser = (value, type) => {
  const [ min, frequency ] = value.split('/');
  let start = min;
  if (min === '*') {
    start = 0;
  }
  const { validMax } = cronRanges[type];
  return range(parseInt(start), validMax, frequency)
};

const wildcardParser = (value, type) => {
  const { validMin, validMax } = cronRanges[type];
  return range(validMin, validMax, 1)
};

const parseCron = (value, type) => {
  if (isInt(value)) {
    return [parseInt(value)]
  } else {
    if (validateType(type, value)) {
      const parser = matchParser(value);
      return parser(value, type)
    }
  }
}

const matchParser = (value) => {
  let parser;
  for (const [regex, parserFunction] of Object.entries(parsers)) {
    const regExp = new RegExp(regex)
    if (regExp.test(value)) {
      parser = parserFunction
    }
  }
  return parser;
};

const parsers = {
  '^[0-9]+(-[0-9]+)$': rangeParser,
  '^\\*|[0-9]+\/[0-9]+$': frequencyParser,
  '^([0-9]+)(,[0-9]+)*$': listParser,
  '^\\*$': wildcardParser,
}

module.exports = {
  parseCron
}
