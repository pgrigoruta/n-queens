const yargs = require('yargs');
const chalk = require('chalk');

yargs.version('1.0.0');

yargs
.option('num-queens', {
    default: 8,
    type: 'int',
    description: 'Number of queens'
  })
.option('num-tries', {
    default: 1,
    type: 'int',
    description: 'Number of problems to try solving'
})
.option('algorithm', {
    default: 8,
    type: 'int',
    description: 'Number of queens'
})
.argv;

const arguments = yargs.parse();