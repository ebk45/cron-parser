## Cron Parser

This is a script designed to parse cron expressions by taking a cron string and giving
a human-readble table as the output.

Cron Value Types:

| operator |    type   |  example  |      details     |
| -------- | --------- | --------- |    ----------    |
|     -    | range     |    1-15   |  any value       |
|     ,    | list      |    1,8    |  list of values  |
|     *    | wildcard  |     *     |  range of values |
|     /    | frequency |    1/5    |  step values     | 




Steps:
- split out cron expression into types (minute, hour, dayOfMonth, months, dayOfWeek)
- two different parsing logics:
  - if single value, return value
  - if special operator, parse and return all values
- validate values using the min and max value of each type (minute is minimum 1, maximum is 59)
- format into table and print to console

Ideas: 
- could be fun to turn this into a cli program. Love an opportunity to make a terminal colourful
  plus I could then also use emojis in a spinner which is also so fun 🤜 🤛.

Improvements:
- find correct parser to use using a regex match
- in terms of SRP, the parser functions are both 
  validating the value and parsing the string wwhi