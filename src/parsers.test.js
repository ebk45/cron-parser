const {
  rangeParser,
  listParser,
  frequencyParser,
  wildcardParser,
  matchParser,
  parseCron,
} = require('./parsers');

describe('#rangeParser', () => {
  it('should translate a string containing a - to an array containing the correct values', () => {
    const range = '1-5';
    const parsedRange = rangeParser(range);
    const expected = [1,2,3,4,5]
    expect(parsedRange).toEqual(expect.arrayContaining(expected));
  })
  it('should return an empty array when a string does not contain a -', () => {
    const invalidRange = '1/5';
    const parsedRange = rangeParser(invalidRange);
    const expected = [];
    expect(invalidRange).toEqual(expect.arrayContaining(expected));
  })
})

describe('#listParser', () => {
  it('should translate a comma separated string to an array containing the same values', () => {
    const list = '1,3,5';
    const parsedList = listParser(list);
    const expected = [1,3,5]
    expect(parsedList).toEqual(expect.arrayContaining(expected));
  })
  it('should return the same string when a string does not contain comma separated values', () => {
    const invalidList = '1-5';
    const parsedList = listParser(invalidList);
    expect(invalidList).toEqual('1-5');
  })
})

describe('#frequencyParser', () => {
  it('should translate a string containing a */ to an array containing the frequency requested starting from the min of the type', () => {
    const frequency = '*/15';
    const type = 'minute';
    const parsedFrequency = frequencyParser(frequency, type);
    const expected = [0, 15, 30, 45]
    expect(parsedFrequency).toEqual(expect.arrayContaining(expected));
  })
  it('should translate a string containing a / to an array containing the frequency requested starting from the min supplied', () => {
    const frequency = '3/4';
    const type = 'hour';
    const parsedFrequency = frequencyParser(frequency, type);
    const expected = [3, 7, 11]
    expect(parsedFrequency).toEqual(expect.arrayContaining(expected));
  })
  it('should return the same string when a frequency does not contain a /', () => {
    const invalidFrequency = '1-5';
    const type = 'minute';
    const parsedFrequency = frequencyParser(invalidFrequency, type);
    expect(invalidFrequency).toEqual('1-5');
  })
})

describe('#wildcardParser', () => {
  it('should translate a * character to an array containing all the possible values for the given type', () => {
    const wildcard = '*';
    const type = 'months';
    const parsedWildcard = wildcardParser(wildcard, type);
    const expected = [1,2,3,4,5,6,7,8,9,10,11,12]
    expect(parsedWildcard).toEqual(expect.arrayContaining(expected));
  })
  it('should return the same string when a string does not contain a * character', () => {
    const invalidWildcard = '1-5';
    const type = 'months';
    const parsedWildcard = wildcardParser(invalidWildcard, type);
    const expected = '1-5'
    expect(invalidWildcard).toEqual('1-5');
  })
})