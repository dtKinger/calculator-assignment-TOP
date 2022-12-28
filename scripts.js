 /* ========================= \
|     GLOBAL DECLARATIONS      |
 \ ========================= */

// INITIALIZE VARIABLES
let memory = null; // Working variable to hold calculated values.
let arrayMem = []; // Working array to hold calculated values.


// GETS + SELECTORS

const numkeys = document.getElementsByClassName('.numkey'); // All number imput keys and the decimal
const operators = document.getElementsByClassName('.operator'); // All operators: =, +, -, x, /
const screen = document.getElementById('screen'); // Div for "screen" containing the io P tag.
const inputOutput = document.getElementById('io'); // Paragraph tag inside Screen
const exponentValue = document.getElementById('exponent');
const clear = document.querySelector('.btn-clear'); // AC button
const divides = document.getElementById('divides');
const multiples = document.getElementById('multiplies');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const equals = document.getElementById('equals');




// FUNCTIONS
function clearIO(){
  inputOutput.innerText = '';
};

function clearMemory(){
  memory = null;
  arrayMem = [];
};

 /* ========================== \
|  END OF GLOBAL DECLARATIONS   |
 \ ========================== */



 /* ========================= \
|           NUMKEYS            |
 \ ========================= */



/* ADDITION 
const add = function(a, b) {
  return a + b;
};
*/

/* SUBTRACTION
const subtract = function(a, b) {
	return a - b;
};
*/

/*
const sum = function(array){
  return array.reduce((p, c) => p + c, 0);
};

const multiply = function(array) {
  return array.reduce((p, c) => p * c, 1)
};
*/


 /* ========================== \
|         END OF NUMKEYS        |
 \ ========================== */




 /* ========================= \
|          OPERATORS           |
 \ ========================= */

 // AC Clears Memory and Clears screen .io
clear.addEventListener('click', () => {
  clearIO();
  clearMemory();
});


// OPERATE
// 1. Calculate
// 2. Round to two decimals
// 3. If big number, show exponent?


// Equals
// Operates, Displays, and CLEARS MEMORY.

// +, -, *, /
// Operates, displays results, keeps current value in memory.


 /* ========================== \
|        END OF OPERATORS       |
 \ ========================== */