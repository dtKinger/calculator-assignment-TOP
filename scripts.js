 /* ========================= \
|     GLOBAL DECLARATIONS      |
 \ ========================= */

// INITIALIZE VARIABLES



// GETS + SELECTORS

const numkeys = document.getElementsByClassName('.numkey'); // All number imput keys and the decimal
const operators = document.getElementsByClassName('.operator'); // All operators: =, +, -, x, /
const clear = document.querySelector('.btn-clear'); // AC button
const screen = document.getElementById('screen'); // Div for "screen" containing the io P tag.
const inputOutput = document.getElementById('io'); // Paragraph tag inside Screen
const exponentValue = document.getElementById('exponent');

// FUNCTIONS
function clearIO(){
  inputOutput.innerText = '';
};

 /* ========================== \
|  END OF GLOBAL DECLARATIONS   |
 \ ========================== */



 /* ========================= \
|           NUMKEYS            |
 \ ========================= */




 /* ========================== \
|         END OF NUMKEYS        |
 \ ========================== */




 /* ========================= \
|          OPERATORS           |
 \ =========================* /

// OPERATE
// 1. Calculate
// 2. Round to two decimals
// 3. If big number, show exponent?


// AC Clears Memory and Clears screen .io

// Equals
// Operates, Displays, and CLEARS MEMORY.

// +, -, *, /
// Operates, displays results, keeps current value in memory.


 /* ========================== \
|        END OF OPERATORS       |
 \ ========================== */