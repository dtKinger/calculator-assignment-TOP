 /* ========================= \
|     GLOBAL DECLARATIONS      |
 \ ========================= */

// INITIALIZE VARIABLES
let output = ''; // Working variable to hold calculated values.
let stored = { value: null }; // Stored and evaluate are mutable not like 
let evaluate = { value: null }; // primitive values, which are not.
let arrayMem = [stored, evaluate]; // Working array to hold calculated values.
let operation;

// GETS + SELECTORS

/// Groups
const numkeys = document.querySelectorAll('.numkey'); // All number imput keys and the decimal
const operators = document.querySelectorAll('.operator'); // All operators: =, +, -, x, /
const screen = document.getElementById('screen'); // Div for "screen" containing the io P tag.
const inputOutput = document.getElementById('io'); // Paragraph tag inside Screen
const exponentValue = document.getElementById('exponent');
/// Operator buttons
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
  stored.value = null;
  evaluate.value = null;
};

function showStored(){
  inputOutput.innerText = stored.value;
}

function showEvaluate(){
  inputOutput.innertext = evaluate;
}

// inputOutput Observer
function checkIO(){
  if (inputOutput.innerText.length > 9){
    alert('Values of 1 Billion or higher are not supported.');
    clearIO();
    showStored();
  }
}
 /* ========================== \
|  END OF GLOBAL DECLARATIONS   |
 \ ========================== */



 /* ========================= \
|       NUMKEYS - CLICKS       |
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

function operate(operation){

  switch (operation) {
    case add:
      add(a, b);
      break;
    case subtract:
      subtract(stored, evaluate);
      break;
    case multiply:
      multiply(stored.value, evaluate.value);
      break;
    case divide:
      divide(stored, evaluate);
      break;
    case equate:
      equate(store, evaluate);
      break;
    }
  
  checkIO(); // Keep the screen under 999,999,999
};

// Equate
// Operates, Displays, and CLEARS MEMORY.

// +, -, *, /
// Operates, displays results, keeps current value in memory.


 /* ========================== \
|        END OF OPERATORS       |
 \ ========================== */