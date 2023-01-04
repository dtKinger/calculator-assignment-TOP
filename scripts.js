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
let operatorMem = [];
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
  result.value = null;
  operatorMem = [];
  lolightOperator();
  unlockDecimal();
};

// Fun fact - first attempt at a recursive function.
function settleMemory(){
  while (memory.length > 4){
    memory.shift();
  }
  while (operatorMem.length > 4){
    operatorMem.shift();
  }
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

// The Result of a calculation, use decimal if needed.
function showResult(){
  if (result.value * 10 % 10 != 0){
    inputOutput.innerText = (result.value).toFixed(2);
  } else {
    inputOutput.innerText = result.value;
  }
}

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
      result.value = null;
    }
    inputOutput.innerText += numkey.getAttribute('value');
    checkIO();
  });
});

function toggleDecimal(){
  if (decimalSetting.value === 'locked'){
    decimal.disabled = true;
    decimal.classList.add('lock-decimal');

  } else if (decimalSetting.value === 'unlocked'){
    decimal.classList.remove('lock-decimal');
    decimal.disabled = false;
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

// Use regex to filter what kind of key was pressed.
const numbersRegex = /[0-9]/;
const operatorsRegex = /[\+\=\/\*\-]/;
const equalsRegex = "Enter";
const decimalRegex = /\./;

// What kind of key was pressed? Numkey, Operator, or Equals?
window.addEventListener('keydown', function(e){
  if (e.key.match(numbersRegex)){
    if (result.value != null){ // If there is a result.value is on screen,
      clearIO();  // clear it the next time a number is entered
      result.value = null;
    }
    inputOutput.innerText += e.key;
    checkIO();
    } else if (e.key.match(decimalRegex)){
      console.log(e.key);
      decimalSetting.value = 'locked';
      toggleDecimal();
      inputOutput.innerText += e.key;
      checkIO();
    } else if (e.key.match(operatorsRegex)
    || e.key.match(equalsRegex)){
      if (e.key.match(equalsRegex)){
        e.preventDefault();
      }
      if (inputOutput.innerText != ''
        && inputOutput.innerText != '.'){
        memory.push(parseFloat(inputOutput.innerText));
        operatorMem.push(e.key);
        if (memory[memory.length-2] != undefined
        && memory[memory.length-1] != undefined){
          operate();
        } else {
          clearIO();
          unlockDecimal();
        }
      }
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
    unlockDecimal();
    if (inputOutput.innerText != ''
      && inputOutput.innerText != '.'){
      memory.push(parseFloat(inputOutput.innerText));
      operatorMem.push(operator.getAttribute('id'));
    }
    if (memory[memory.length-2] != undefined && memory[memory.length-1] != undefined){
      operate();
    } else {
      clearIO();
      unlockDecimal();
    }
  });
});


// For Operation Style
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
  console.log("result: " + result);
  console.log("result.value: " + result.value);
  console.log("operatorMem: " + operatorMem);
  console.log("memory: " + memory);
  console.log("inputOutput: " + inputOutput);
  console.log("inputOutput.innerText: " + inputOutput.innerText);

  if (operatorMem[operatorMem.length-1] != operatorMem[operatorMem.length-2]){
    operator = operatorMem[operatorMem.length-2];
  } else if (operatorMem[operatorMem.length-1] == operatorMem[operatorMem.length-2]){
    operator = operatorMem[operatorMem.length-1];
  };
  if (operator == 'plus' || operator == '+'){
    result.value = a + b;
  } else if (operator == 'minus' || operator == '-'){
    result.value = a - b;
  } else if (operator == 'multiplies' || operator == '*'){
    result.value = a * b;
  } else if (operator == 'divides' || operator == '/'){
    result.value = a / b;
  }

  memory.push(parseFloat(result.value));
  showResult();
  checkIO(); // Keep the screen under 999,999,999
  operator = null; //Pretty sure I don't need this. 
  settleMemory(); // Recursive function to keep memory array down to length of 4.
  lolightOperator(); // Remove CSS styles for highlighted operator.
};

// equals also works with the operate() function
// since it's included in the operator list.
// But loads the previous operator from memory.

function equate(){
  memory = [];
  operatorMem = [];
  lolightOperator();
  unlockDecimal();
};

equals.addEventListener('click', () => {
  equate();
});

// Use regex to only allow numbers and . onto the screen. 



 /* ========================== \
|        END OF OPERATORS       |
 \ ========================== */