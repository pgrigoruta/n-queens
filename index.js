const yargs = require('yargs');
const args = require('yargs-default-command')(yargs);
const chalk = require('chalk');

const Problem = require('./nqueens');

const supportedAlgorithms = ['hillclimb-first-choice','hillclimb-steepest-ascent','hillclimb-random-restart', 'annealing']


args
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
    default: 'hillclimb-first-choice',
    type: 'string',
    description: 'Algorithm',
    describe: 'Must be one of '+supportedAlgorithms.join(', ')
})
.args;

const arguments = yargs.parse();

if(!supportedAlgorithms.includes(arguments.algorithm)) {
    console.log(chalk.red.inverse("The given algorithm ("+arguments.algorithm+") is not supported. Use one of "+supportedAlgorithms.join(', ')));
}
else {
    let problem = new Problem(arguments.numQueens, arguments.numTries, arguments.algorithm);
    problem.run();
    console.log(problem.getStatsAsString());

    //console.log(problem.getSolutionsAsString());
}

