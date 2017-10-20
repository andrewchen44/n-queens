/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var solution = board.rows();
  solution[0][0] = 1;
  for (let i = 1; i < solution.length; i++) { 
    for (let j = 0; j < solution.length; j++) {
      solution[i][j] = 1;  
      if (board.hasColConflictAt(j)) {
        solution[i][j] = 0;
      }
      if (board.hasRowConflictAt(i)) {
        solution[i][j] = 0;
      } 
    } 
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionCount = 1;
  for (var i = 1; i <= n; i++) {
    solutionCount = solutionCount * i;
  }
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, secret) {
  var board = new Board({n: n});
  var solutionsArr = [];
  var solution = board.rows(); 
  var count = 0;

  if (n === 0) {
    return [];
  }
  
  var placeQueen = function (row) {
    for (var i = 0; i < n; i++) { 
      solution[row][i] = 1;
      if (board.hasAnyQueensConflicts()) {
        solution[row][i] = 0;
      } else {
        if (row + 1 < n) {
          placeQueen(row + 1);
        } else {
          var stringified = JSON.stringify(solution);
          console.log(stringified);
          stringified = JSON.parse(stringified);
          solutionsArr.push(stringified);
          solution[row][i] = 0;
        }
      }
      solution[row][i] = 0;
    }
  };

  if (n < 4 && n > 1) {
    for (let i = 0; i < n; i++) {
      solutionsArr.push([]);
    }
    return solutionsArr;
  } else {
    placeQueen(0);
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutionsArr[0]));

  if (secret) {
    return solutionsArr;
  }
  return solutionsArr[0];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionsArr = findNQueensSolution(n, true);
  console.log(solutionsArr.length);
  var solutionCount = solutionsArr.length; //fixme
  if (n === 0) {
    return 1;
  } else if (n < 4 && n > 1) {
    return 0;
  }
  //console.log(JSON.stringify(solutionsArr));
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
