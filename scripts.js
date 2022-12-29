 /* ========================= \
|     GLOBAL DECLARATIONS      |
 \ ========================= */

// INITIALIZE VARIABLES

let memory = [{ previous: null }, { current: null }]; // Stored and evaluate are mutable not like 
let display = { value: null };
let result = { value: null };
let operationType = { value: null }; // Store the kind of operation to take place
// let arrayMem = [stored, evaluate]; // Working array to hold calculated values.
/*
let a = stored.value;
let o = operationType.value;
let b = evaluate.value;
*/


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
const multiplies = document.getElementById('multiplies');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const equals = document.getElementById('equals');

// FUNCTIONS

function clearIO(){
  inputOutput.innerText = '';
};

function clearMemory(){
  memory = []
  display.value = null;
  operationType.value = null;
};

function showStored(){
  inputOutput.innerText = stored.value;
}

function showdisplay(){
  inputOutput.innerText = display.value;
};

function showEvaluate(){
  inputOutput.innertext = evaluate.value;
}

function showResult(){
  inputOutput.innerText = result.value;
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
    stored.value = inputOutput.innerText;
    display.value = inputOutput.innerText;
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

// Plus
plus.addEventListener('click', () => {
  operationType.value = 'add';
  evaluate.value = display.value;
  clearIO();
  if (stored.value != null && evaluate.value != null && operationType.value != null){
    operate();
  }
  
  
});

// Minus


// Multiplies


// Divides


 // AC Clears Memory and Clears screen .io
clear.addEventListener('click', () => {
  clearIO();
  clearMemory();
});

// OPERATE
// 1. Calculate
// 2. Round to two decimals

function operate(o){
  o = operationType.value;
  switch (operationType) {
  case 'add':
    result.value = stored.value + evaluate.value;
    break;
  case 'subtract':
    result.value = stored.value - evaluate.value;
    break;
  case 'multiply':
    result.value = stored.value * evaluate.value;
    break;
  case 'divide':
    result.value = stored.value / evaluate.value;
    break;
  case 'equate':
    ((stored.value) (operationType.getAttribute('value')) (evaluate.value));
    break;
  }

  showResult();
  checkIO(); // Keep the screen under 999,999,999
  operationType.value = null;
};


/*
stored.value
display.value
evaluate.value
*/


// Equate
// Operates, Displays, and CLEARS MEMORY.

// +, -, *, /
// Operates, displays results, keeps current value in memory.


 /* ========================== \
|        END OF OPERATORS       |
 \ ========================== */