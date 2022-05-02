## Cron Expression Parser

This is a script designed to parse cron expressions by taking a cron string 
and giving a human-readble table as the output.

To run the script:

```
node index.js "*/15 0 1,15 * 1-5 /usr/bin/find"
```

And you will get the following output:

```
minute         0 15 30 45
hour           0
day of month   1 15
month          1 2 3 4 5 6 7 8 9 10 11 12
day of week    1 2 3 4 5
command        /usr/bin/find
```

### Cron Value Types:

| operator |    type   |  example  |      details     |
| -------- | --------- | --------- |    ----------    |
|     -    | range     |    1-15   |  range of values       |
|     ,    | list      |    1,8    |  list of values  |
|     *    | wildcard  |     *     |  all values |
|     /    | frequency |    1/5    |  step values     | 

## Tests

There are unit tests covering the parsing logic. 
To run the tests, run the following:

```
npm install
npm test
```


Future Improvements:
- Tests need to be written for the util functions.
- Linting setup has not been completed
- More verbose error handling when invalid cron expressions are passed in