 /* ========================= \
|     GLOBAL DECLARATIONS      |
 \ ========================= */

// INITIALIZE VARIABLES
let memory = ''; // Working variable to hold calculated values.
let arrayMem = []; // Working array to hold calculated values.
let a = null;
let b = null;


// GETS + SELECTORS

const numkeys = document.querySelectorAll('.numkey'); // All number imput keys and the decimal
const operators = document.querySelectorAll('.operator'); // All operators: =, +, -, x, /
const screen = document.getElementById('screen'); // Div for "screen" containing the io P tag.
const inputOutput = document.getElementById('io'); // Paragraph tag inside Screen
const exponentValue = document.getElementById('exponent');
// Operator buttons
const clear = document.querySelector('.btn-clear');
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
  memory = '';
  arrayMem = [];
};

function showCurrentValue(){
  inputOutput.innerText = memory;
}

// inputOutput Observer
function checkIO(){
  if (inputOutput.innerText.length > 9){
    alert('Values of 1 Billion or higher not supported.');
    clearIO();
    showCurrentValue();
  }
}

 /* ========================== \
|  END OF GLOBAL DECLARATIONS   |
 \ ========================== */



 /* ========================= \
|      NUMKEYS - CLICKS        |
 \ ========================= */

 numkeys.forEach(function (numkey) {
  numkey.addEventListener('click', function() {
    inputOutput.innerText += numkey.getAttribute('value');
    checkIO();
  });
});

 /* ========================= \
|      NUMKEYS - KEYDOWN       |
 \ ========================= */




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

function operate(a, b){

  

  checkIO(); // Keep the screen under 999,999,999
};

/* FOR ANOTHER DAY
if (inputOutput.innerText.length > 10){
  let zeros = (inputOutput.innerText.length - 10);
  exponentValue.textContent = `e${zeros}`;
}
*/

// Equals
// Operates, Displays, and CLEARS MEMORY.

// +, -, *, /
// Operates, displays results, keeps current value in memory.


 /* ========================== \
|        END OF OPERATORS       |
 \ ========================== */