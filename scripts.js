/* ========================= \
|     GLOBAL DECLARATIONS      |
 \ ========================= */

// GETS + SELECTORS

const powerBtn = document.getElementById('range');
const blinker = document.getElementById('blinker');
const screen = document.getElementById('screen');
const inputOutput = document.getElementById('io'); // Paragraph tag inside Screen

/// Groups
const numkeys = document.querySelectorAll('.numkey'); // All number imput keys and the decimal
const operators = document.querySelectorAll('.operator'); // All operators: =, +, -, x, /
let oldActive = document.getElementsByClassName("active-op");

// const exponentValue = document.getElementById('exponent'); // For use with Scientific notation.

/// Operator buttons
const clear = document.querySelector('.btn-clear');
const equals = document.getElementById('equals');
const decimal = document.getElementById('decimal');
const autoCalcBtn = document.querySelectorAll('.auto-calc');
const backspace = document.querySelector('#backspace')

// INITIALIZE VARIABLES

let memory = []; 
let result = { value: null };
let operatorMem = [];
let decimalSetting = { value: 'unlocked'};
let recentlyDeleted = [];

// FUNCTIONS

function playClick(){
  let powerSound = document.getElementById('click');
  powerSound.currentTime = 0;
  powerSound.play();
};

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
  recentlyDeleted = [];
  lolightOperator();
  unlockDecimal();
};

// Keep Memory arrays to length of 5.
function settleMemory(){
  while (memory.length > 5){
    memory.shift();
  }
  while (operatorMem.length > 5){
    operatorMem.shift();
  }
  while (recentlyDeleted.length > 5){
    recentlyDeleted.shift();
  }
};


function memBlur(){
  clearIO();
  clearMemory();
};


// Stored is the most recent item commited to memory.
function showStored(){
  if (memory[memory.length-2] != null){
  inputOutput.innerText = memory[memory.length-2];
  } else if (memory[memory.length-2] != null){
    inputOutput.innerText = memory[memory.length-2];
  } else {
    inputOutput.innerText = '';
  }
}


// The Result of a calculation, use decimal if needed.
function showResult(){
  if (result.value == undefined){
    inputOutput.innerText = 'undefined';
  } else if (result.value * 10 % 10 != 0){
    inputOutput.innerText = (result.value).toFixed(2);
  } else {
    inputOutput.innerText = result.value;
  }
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

function decimalCheckResult(){
  if ((result.value).toString().includes('.')){
    decimalSetting.value = 'locked';
    toggleDecimal();
  };
};

// OPERATE

function operate(a, b){
  a = parseFloat(memory[memory.length-2]);
  b = parseFloat(memory[memory.length-1]);
 
  if (operatorMem[operatorMem.length-1] != operatorMem[operatorMem.length-2]){
    operator = operatorMem[operatorMem.length-2]; // This is key to letting '='
    // or Return operate with the previously stored operator
  } else {
    operator = operatorMem[operatorMem.length-1];
  };
  if (operator == 'plus' || operator == '+'){
    result.value = a + b;
  } else if (operator == 'minus' || operator == '-'){
    result.value = a - b;
  } else if (operator == 'multiplies' || operator == '*'){
    result.value = a * b;
  } else if (operator == 'divides' || operator == '/'){
    if (b == 0 ? result.value = undefined : result.value = a / b);
  }

  memory.push(parseFloat(result.value));
  // Handle decimal
  decimalCheckResult();
  showResult();
  checkIO(); // Keep the screen under 999,999,999
  settleMemory(); // Function to keep memory array down to length of 5.
  lolightOperator(); // Remove CSS styles for highlighted operator.

};

/* Equals also works with the operate() function
since it's included in the operator list.
But loads the previous operator from memory,
instead of having it's own operator, e.g. eval().
*/

function equate(){
  lolightOperator();
  unlockDecimal();
};


function autoCalc(a){
  a = parseFloat(memory[memory.length-1]);
  operator = operatorMem[operatorMem.length-1];
    if (operator == 'sqrt'){
      result.value = Math.sqrt(a);
    } else if (operator == 'exponent'){
      result.value = a * a;
    }
  memory.push(parseFloat(result.value));
  decimalCheckResult();
  showResult();
  checkIO(); // Keep the screen under 999,999,999
  settleMemory(); // Keep memory array down to length of 5.
  lolightOperator(); // Remove operator buttin highlight class.
};


function changeButton(e) {
  for (let i = 0; i < oldActive.length; i++) {
    oldActive[i].classList.remove("active-op");
  }
  e.target.classList.add("active-op");
};

// Used in operate() to remove any active class
function lolightOperator(){
  for (let i = 0; i < oldActive.length; i++) {
    oldActive[i].classList.remove("active-op");
  }
};

function doBackspace(){
  if (inputOutput.innerText != ''){
    let string = inputOutput.innerText;
    recentlyDeleted.push(string.slice(-1));
    inputOutput.innerText = string.substring(0, string.length-1);
    if (result.value != null){
      result.value = string.substring(0, string.length-1);
    }
    checkDeleted();
    settleMemory();
  }
};

function checkDeleted(){
  if (recentlyDeleted[recentlyDeleted.length-1] == "."){
    unlockDecimal();
  }
};

 /* ========================== \
|  END OF GLOBAL DECLARATIONS   |
 \ ========================== */


 /* ========================== \
|       POWER UP BEHAVIOUR      |
 \ ========================== */

powerBtn.addEventListener('change', (e) =>{
  playClick();
  blinker.classList.toggle('blinking-cursor');
  blinker.classList.toggle('cursor-hide');
  screen.classList.toggle('backlight');
  numkeys.forEach(function (numkey){
    numkey.classList.toggle('backlight--numkeys');
  });
  operators.forEach(function (operator){
    operator.classList.toggle('backlight--operators');
  });
  autoCalcBtn.forEach(function (autoCalc){
    autoCalc.classList.toggle('backlight--operators');
  });
  equals.classList.remove('backlight--operators'); // equals is an operator class but styled differently
  equals.classList.add('backlight--equals');
  clear.classList.add('backlight--operators');
});

 /* ========================== \
|   END OF POWER UP BEHAVIOUR   |
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

decimal.addEventListener('click', () => {
  decimalSetting.value = 'locked';
  toggleDecimal();
});

backspace.addEventListener('click', () => {
  doBackspace();
});

 /* ========================= \
|      OPERATORS - CLICKS      |
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
      unlockDecimal();
    } else {
      clearIO();
      unlockDecimal();
    }
  });
});

// Auto-calculate buttons for Exponent and Square root.
// I'd call them function buttons but... 

autoCalcBtn.forEach(function (btn){
  btn.addEventListener('click', () => {
    if (inputOutput.innerText != ''
    && inputOutput.innerText != '.'){
      memory.push(parseFloat(inputOutput.innerText));
      operatorMem.push(btn.getAttribute('id'));
    }
    autoCalc();
  });
});


// For Operator Buttons Style
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", changeButton);
};


// AC Clears Memory and Clears screen .io
 clear.addEventListener('click', () => {
  memBlur();
});

// Equates two values without introducing a new operator.
// I.e. use the 2nd-most recent operator available.
equals.addEventListener('click', () => {
  equate();
  decimalCheckResult();
});

 /* ========================== \
|        END OF OPERATORS       |
 \ ========================== */


 /* ========================= \
|     KEYDOWNS: NUM + OPS      |
 \ ========================= */

// Use regex to filter what kind of key was pressed.
const numbersRegex = /[0-9]/;
const operatorsRegex = /[\+\=\/\*\-]/;
const equalsRegex = /Enter$/; // expand this to have Enter and = maybe???

// Use keypress for operator styles instead
// of keydown since there appeared to be a conflict.
window.addEventListener('keypress', function(e) {
  if (e.key == '+'){
    lolightOperator();
    document.getElementById('plus').classList.add('active-op');
  } else if (e.key == '-'){
    lolightOperator();
    document.getElementById('minus').classList.add('active-op');
  } else if (e.key == '*'){
    lolightOperator();
    document.getElementById('multiplies').classList.add('active-op');
  } else if (e.key == '/'){
    lolightOperator();
    document.getElementById('divides').classList.add('active-op');
  } else if (e.key == '=' || e.key == 'Enter'){
    equate();
    decimalCheckResult();
  }
  ;
});

// What kind of key was pressed? Numkey, Operator, or Equals?
window.addEventListener('keydown', function(e){
  if (e.key.match(numbersRegex)){
    if (result.value != null){ // If there is a result.value is on screen,
      clearIO();  // clear it the next time a number is entered
      result.value = null;
      }
    // If the power's on, accept inputs to screen.
    if (blinker.classList.contains('blinking-cursor')){
      // This also never goes to memory or operator memory,
      // because those can't take empty content or a period.
      inputOutput.innerText += e.key; 
      checkIO();
    };
  } else if (e.key == '.'){
    if (decimalSetting.value == 'unlocked'){
      inputOutput.innerText += e.key;
      checkIO();
    }
    decimalSetting.value = 'locked';
    toggleDecimal();
  } else if (e.key == 'Backspace'){
    doBackspace();
  } else if (e.key == 'Escape'){
    memBlur();
  } else if (e.key.match(operatorsRegex)
    || e.key.match(equalsRegex)){
    if (e.key.match(equalsRegex)){ e.preventDefault()};
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
  };
});

 /* ========================== \
|        END OF KEYDOWNS        |
 \ ========================== */
