 /* ========================= \
|     GLOBAL DECLARATIONS      |
 \ ========================= */

// INITIALIZE VARIABLES

let memory = []; // Stored and evaluate are mutable not like 
let display = { value: null };
let result = { value: null };
let operationType = { value: null }; // Store the kind of operation to take place
// let arrayMem = [stored, evaluate]; // Working array to hold calculated values.
/*
let a = memory[memory.length-2];
let o = operationType.value;
let b = memory[memory.length-1];
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
  memory = [];
  display.value = null;
  operationType.value = null;
};

function showStored(){
  if (memory[memory.length-1] != null){
  inputOutput.innerText = memory[memory.length-1];
  } else {
    inputOutput.innerText = '';
  }
}

function showdisplay(){
  inputOutput.innerText = display.value;
};

function showEvaluate(){
  inputOutput.innertext = memory[memory.length-1];
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
  memory.push(parseFloat(inputOutput.innerText));
  operationType.value = 'add';
  clearIO();
  if (memory[memory.length-2] != null && memory[memory.length-1] != null && operationType.value != null){
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

function operate(a, b){
  a = parseFloat(memory[memory.length-2]);
  b = parseFloat(memory[memory.length-1]);
  
  if (operationType.value = 'add' ){
    result.value = a + b;
  } else if (operationType.value = 'subtract'){
    result.value = a - b;
  } else if (operationType.value = 'multiply'){
    result.value = a * b;
  } else if (operationType.value = 'divide'){
    result.value = a / b;
  }
  showResult();
  checkIO(); // Keep the screen under 999,999,999
};


// +, -, *, /
// Operates, displays results, keeps current value in memory.


 /* ========================== \
|        END OF OPERATORS       |
 \ ========================== */