// Power button fun

powerBtn = document.getElementById('range');
blinker = document.getElementById('blinker');

powerBtn.addEventListener('change', (e) =>{
  blinker.classList.toggle('blinking-cursor');
  blinker.classList.toggle('cursor-hide');
  screen.classList.toggle('backlight');
});

/* ========================= \
|     GLOBAL DECLARATIONS      |
 \ ========================= */

// GETS + SELECTORS

const screen = document.getElementById('screen');

/// Groups
const numkeys = document.querySelectorAll('.numkey'); // All number imput keys and the decimal
const operators = document.querySelectorAll('.operator'); // All operators: =, +, -, x, /
let oldActive = document.getElementsByClassName("active-op");
const inputOutput = document.getElementById('io'); // Paragraph tag inside Screen
const exponentValue = document.getElementById('exponent');
/// Operator buttons
const clear = document.querySelector('.btn-clear');
const equals = document.getElementById('equals');
// const decimal = document.getElementById('decimal');

// INITIALIZE VARIABLES

let memory = []; // Stored and evaluate are mutable not like 
let result = { value: null };
// let operationType = { value: null }; // Store the kind of operation to take place
let operatorMem = [];
let display = { value: inputOutput.innerText };
let decimalSetting = { value: ''};

// FUNCTIONS

function clearIO(){
  inputOutput.innerText = '';
  lolightOperator();
  decimalSetting.value = '';
};

function clearMemory(){
  memory = [];
  display.value = null;
  result.value = null;
  operatorMem = [];
  lolightOperator();
  // decimalSetting.value = '';
};

// Stored is the most recent item commited to memory.
function showStored(){
  if (memory[memory.length-1] != null){
  inputOutput.innerText = memory[memory.length-1];
  } else {
    inputOutput.innerText = '';
  }
}

// The Result of a calculation
function showResult(){
  if (result.value * 10 % 10 != 0){
    inputOutput.innerText = (result.value).toFixed(2);
  } else {
    inputOutput.innerText = result.value;
  }
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
    // If there is a result.value is on screen,
    // clear it the next time a number is entered
    if (result.value != null){
      clearIO();
      emptyResults();
    }
    inputOutput.innerText += numkey.getAttribute('value');
    // display.value = inputOutput.innerText; - may not need this anymore
    checkIO();
  });
});

/*
function checkDecimal(){
  if (decimalSetting.value == 'clicked') return // kill it.
};

decimal.addEventListener('click', () => {
  checkDecimal();
  decimalSetting.value = 'clicked';
});
*/

 /* ========================= \
|      NUMKEYS - KEYDOWN       |
 \ ========================= */




 /* ========================== \
|         END OF NUMKEYS        |
 \ ========================== */


 /* ========================= \
|          OPERATORS           |
 \ ========================= */

 // For Calculation
operators.forEach(function (operator) {
  operator.addEventListener('click', function(e) {
    memory.push(parseFloat(inputOutput.innerText));
    operatorMem.push(operator.getAttribute('id'));
    if (memory[memory.length-2] != undefined && memory[memory.length-1] != undefined){
      operate();
    } else {
      clearIO();
    }
  });
});

// For Style
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", changeButton);
}
function changeButton(e) {
  for (let i = 0; i < oldActive.length; i++) {
    oldActive[i].classList.remove("active-op");
  }
  e.target.classList.add("active-op");
}

function lolightOperator(){
  for (let i = 0; i < oldActive.length; i++) {
    oldActive[i].classList.remove("active-op");
  }
};

 // AC Clears Memory and Clears screen .io
clear.addEventListener('click', () => {
  clearIO();
  clearMemory();
});

// OPERATE

function operate(a, b){
  a = parseFloat(memory[memory.length-2]);
  b = parseFloat(memory[memory.length-1]);
  
  if (operatorMem[operatorMem.length-1] != operatorMem[operatorMem.length-2]){
    operator = operatorMem[operatorMem.length-2];
  } else if (operatorMem[operatorMem.length-1] == operatorMem[operatorMem.length-2]){
    operator = operatorMem[operatorMem.length-1];
  };
  if (operator == 'plus'){
    result.value = a + b;
  } else if (operator == 'minus'){
    result.value = a - b;
  } else if (operator == 'multiplies'){
    result.value = a * b;
  } else if (operator == 'divides'){
    result.value = a / b;
  }
  memory.push(parseFloat(result.value));
  showResult();
  checkIO(); // Keep the screen under 999,999,999
  operator = null;
  lolightOperator();
  // decimalSetting.value = '';
};

// equals also works with the operate() function
// since it's included in the operator list.
equals.addEventListener('click', () => {
  memory = [];
  display.value = null;
  lolightOperator();
  // decimalSetting.value = '';
});


 /* ========================== \
|        END OF OPERATORS       |
 \ ========================== */
