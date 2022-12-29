 /* ========================= \
|     GLOBAL DECLARATIONS      |
 \ ========================= */

// INITIALIZE VARIABLES

let memory = []; // Stored and evaluate are mutable not like 
let display = { value: null };
let result = { value: null };
let operationType = { value: null }; // Store the kind of operation to take place


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

function showResult(){
  inputOutput.innerText = result.value;
}

function emptyResults(){
  result.value = null;
};

// inputOutput Observer
function checkIO(){
  if (inputOutput.innerText.length > 9){
    alert('Values of 1 Billion or higher are not supported.');
    clearIO();
    memory.pop();
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
    if (result.value != null){
      clearIO();
      result.value = null;
    }
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

 operators.forEach(function (operator) {
  operator.addEventListener('click', function(e) {
    memory.push(parseFloat(inputOutput.innerText));
    if (operationType.value != null
      && memory[memory.length-2] != undefined
      && memory[memory.length-1] != undefined){
      operate();
    } else if (operationType.value == null
      && memory[memory.length-2] != undefined
      && memory[memory.length-1] != undefined){
      operationType.value = operator.getAttribute('id');
      operate();
    } else {
      clearIO();
    }
  });
});

 // AC Clears Memory and Clears screen .io
clear.addEventListener('click', () => {
  clearIO();
  clearMemory();
});

// OPERATE
// 2. Round to two decimals

function operate(a, b){
  a = parseFloat(memory[memory.length-2]);
  b = parseFloat(memory[memory.length-1]);
  
  if (operationType.value == 'plus'){
    result.value = a + b;
  } else if (operationType.value == 'minus'){
    result.value = a - b;
  } else if (operationType.value == 'multiplies'){
    result.value = a * b;
  } else if (operationType.value == 'divides'){
    result.value = a / b;
  } else if (operationType.value == 'equals'){
    result.value = inputOutput.innerText; 
  }
  memory.push(parseFloat(result.value));
  showResult();
  checkIO(); // Keep the screen under 999,999,999
  operationType.value = null;

};


// +, -, *, /
// Operates, displays results, keeps current value in memory.


 /* ========================== \
|        END OF OPERATORS       |
 \ ========================== */