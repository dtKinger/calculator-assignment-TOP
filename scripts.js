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
const decimal = document.getElementById('decimal');

// INITIALIZE VARIABLES

let memory = []; // Stored and evaluate are mutable not like 
let result = { value: null };
// let operationType = { value: null }; // Store the kind of operation to take place
let operatorMem = [];
let display = { value: inputOutput.innerText };
let decimalSetting = { value: 'unlocked'};

// FUNCTIONS

function clearIO(){
  inputOutput.innerText = '';
  lolightOperator();
  decimalSetting.value = 'unlocked';
  toggleDecimal();
};

function clearMemory(){
  memory = [];
  display.value = null;
  result.value = null;
  operatorMem = [];
  lolightOperator();
  unlockDecimal();
};

function memBlur(){
  clearIO();
  clearMemory();
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

 // Lock numkeys until power is turned on
numkeys.forEach(function (numkey) {
  numkey.disabled = true;
  powerBtn.addEventListener('change', () => {
    if (blinker.classList.contains('blinking-cursor')){
      numkey.disabled = false;
    } else if (blinker.classList.contains('cursor-hide')){
      numkey.disabled = true;
      memBlur();
    };
  });
});

// Take input on key clicks
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

function toggleDecimal(){
  if (decimalSetting.value === 'locked'){
    decimal.disabled = true;
    decimal.classList.add('lock-decimal');

  } else if (decimalSetting.value === 'unlocked'){
    decimal.disabled = false;
    decimal.classList.remove('lock-decimal');
  }
};

function unlockDecimal(){
  decimalSetting.value = 'unlocked';
  toggleDecimal();
};

decimal.addEventListener('click', () => {
  decimalSetting.value = 'locked';
  toggleDecimal();
});


 /* ========================= \
|      NUMKEYS - KEYDOWN       |
 \ ========================= */

// Note: Need to handle for keys that require shift+
// e.g. 8 is keycode 56 and &times; is 56 'shiftKey': true;
// + is shift+187 while = is 187
// Or just return the event.key after checking if shiftKey: true.

// Use regex to only allow numbers and . onto the screen. 
const numbersRegex = /[0-9.]/;
window.addEventListener('keydown', function(e){
  const keypress = document.querySelector(`.numkey[value="${e.key}"]`);
  if (e.key.match(numbersRegex)){
  inputOutput.innerText += e.key;
 }
});

 /* ========================== \
|         END OF NUMKEYS        |
 \ ========================== */


 /* ========================= \
|          OPERATORS           |
 \ ========================= */

 // For Calculation

 // Lock operators until power is on
operators.forEach(function (operator) {
  operator.disabled = true;
  powerBtn.addEventListener('change', () => {
    if (blinker.classList.contains('blinking-cursor')){
      operator.disabled = false;
    } else if (blinker.classList.contains('cursor-hide')){
      operator.disabled = true;
      memBlur();
    };
  });
});

// Unlocked Operator functionality
operators.forEach(function (operator) {
  operator.addEventListener('click', function(e) {
    memory.push(inputOutput.innerText);
    operatorMem.push(operator.getAttribute('id'));
    if (memory[memory.length-2] != undefined && memory[memory.length-1] != undefined){
      operate();
    } else {
      clearIO();
      unlockDecimal();
    }
  });
});

const operatorsRegex = /[\+\=\/\*\-]/;
window.addEventListener('keydown', function(e){
  const operation = document.querySelector(`.operator[id="${e.key}"]`);
  if (e.key.match(operatorsRegex)){
    memory.push(inputOutput.innerText);
    operatorMem.push(e.key);
    if (memory[memory.length-2] != undefined && memory[memory.length-1] != undefined){
      operate();
    } else {
      clearIO();
      unlockDecimal();
    }
  }
});

/* Not sure if I'll need this or not
// Document Keydown event for Operators
document.addEventListener('keydown', function(e){
  if (e.key.match(operatorRegex)){
    return false;
  }
  if(e.key == 'Enter') {
    e.preventDefault();
  } else if (e.key == 'Shift') {
    return false;
  } else if (e.key == 'Backspace') {
    e.preventDefault();
  }
});
*/
  
// const operatorPress = document.querySelector(`.operator[value="${e.key}"]`);



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
  memBlur();
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
// But loads the previous operator from memory.
equals.addEventListener('click', () => {
  memory = [];
  display.value = null;
  lolightOperator();
  unlockDecimal();
});


 /* ========================== \
|        END OF OPERATORS       |
 \ ========================== */