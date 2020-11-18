const { identity } = require('underscore');
var _ = require('underscore');
const { exit } = require('yargs');

class NQueens {
    constructor(numQueens,numTries,algorithm) {
        this.stats = {
            "numSuccess": 0,
            "numFails": 0,
            "uniqueSolutions": []
        };
        this.numQueens = numQueens;
        this.numTries = numTries;
        this.algorithm = algorithm;
        this.start = new Date().getTime();
    }

    run() {
        for(let i=1;i<=this.numTries;i++) {
            let solution = null;
            
            switch(this.algorithm) {
                case 'hillclimb-first-choice':
                    solution = this.hillClimbFirstChoice();
                    break;
                case 'hillclimb-steepest-ascent':
                    solution = this.hillClimbSteepestAscent();
                    break;
                case 'hillclimb-random-restart':
                    solution = this.hillClimbRandomRestart();
                    break;
                case 'annealing':
                    solution = this.annealing();
                    break;
            }    

            this.aggregateStats(solution);
        }
        
    }

    hillClimbFirstChoice() {
        let state = this.getRandomState();
        let stateScore = this.calculateScore(state);

        while(state!=null && stateScore != 0) {
            let nextState = this.getRandomNextState(state);
            let nextScore = this.calculateScore(nextState);
            let foundBetterState = false;


            if(nextScore < stateScore ){
                state = nextState;
                stateScore = nextScore;
                foundBetterState = true;
            }

            if(!foundBetterState) {
                state = null;
            }
        }

        return state;
        
        
    }

    hillClimbSteepestAscent() {
        /**
         *  for(let i=0;i<nextStates.length;i++) {
                let nextScore = this.calculateScore(nextStates[i]);
                if(nextScore < stateScore) {
                    state = nextStates[i];
                    stateScore = nextScore;
                    hasBetterNextState = true;
                }
            }
         */
        console.log('ok....');
    }

    hillClimbRandomRestart() {

    }

    annealing() {

    }

    getRandomNextState(currentState) {
        let randIndex = Math.floor(Math.random() * currentState.length);
        let randRow = Math.floor(Math.random() * currentState.length) + 1;
        let nextState = [...currentState];
        nextState[randIndex] = randRow;
        return nextState;
        
    }

    getNextStates(currentState) {
        let nextStates = [];
        for(let column=0;column<currentState.length;column++) {
            for(let index=1;index <= this.numQueens; index++) {
                if(currentState[column] != index) {
                    let newState = [...currentState]; //clone the array
                    newState[column] = index;
                    nextStates.push(newState);
                }
            }
        }
        return nextStates;
    }

    aggregateStats(solution) {
        if(solution) {
            this.stats.numSuccess++;
            if(this.stats.uniqueSolutions.indexOf(solution) === -1) {
                this.stats.uniqueSolutions.push(solution);
            }
        }
        else {
            this.stats.numFails++;
        }
    }

    getStatsAsString() {
        let successRate = parseFloat(this.stats.numSuccess*100 / this.numTries).toFixed(2);
        let end = new Date().getTime();
        let runTime =  (end - this.start)/1000;
        return 'Execution time: ' + runTime + 's . Success rate: '+successRate+'%';
        
    }

    getSolutionsAsString() {
        let ret = [];
        for(let i=0;i<this.stats.uniqueSolutions.length;i++) {
            ret+=this.getStateAsString(this.stats.uniqueSolutions[i]) + "\n\n--------------------\n\n";
        }
        return ret;
    }

    getRandomState() {
        var array = [];
        for(let i=1;i<=this.numQueens;i++) {
            array.push(i);
        }

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    getStateAsString(state) {
        var ret = [];

        for(let column=1;column<=state.length;column++) {
            let curColumn = '';
            for(let row=1;row<=state.length;row++) {
                if(row == state[column - 1]) curColumn+="1";
                else curColumn+='_';
            }
            ret.push(curColumn);
        }

        //transpose
        ret = _.zip.apply(_, ret)

        let stringRepresentation = '';
        for(let i=0;i<ret.length;i++) {
            for(let j=0;j<ret[i].length;j++) {
                stringRepresentation+= ret[i][j];
            } 
            stringRepresentation+="\n";
        }

        return stringRepresentation;
    }

    isCollision(x1, y1, x2, y2) {
        return x1 == x2 || y1 == y2 || Math.abs(x1-x2) == Math.abs(y1-y2)
    }

    calculateScore(state) {

        var rowCollisions = function (a) {
            let collision = 0;
            for (var i in a) {
              for (var j in a) {
                if (j != i) {
                  collision = a[i] == a[j] ? collision+1 : collision;
                }
              }
            }
            return collision;
          };
          
          // Count the number of column collisions
          var diaCollisions = function (a) {
            let collision = 0;
            for (var i in a){
              for (var j in a){
                if (i != j) {
                  let dp = Math.abs(i-j);
                  collision = a[i] == a[j]+dp ? collision+1 : collision;
                  collision = a[i] == a[j]-dp ? collision+1 : collision;
                }
              }
            }
            return collision / 2;
          };

          return diaCollisions(state) + rowCollisions(state);
            
    }


   
}

module.exports = NQueens;