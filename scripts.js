// Power button fun

powerBtn = document.getElementById('range');
blinker = document.getElementById('blinker');

powerBtn.addEventListener('change', (e) =>{
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
  equals.classList.remove('backlight--operators');
  equals.classList.add('backlight--equals');
  clear.classList.add('backlight--operators');
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
const autoCalcBtn = document.querySelectorAll('.auto-calc');
const backspace = document.querySelector('#backspace')

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

// Keep Memory array to length of 5.
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


// OPERATE

function operate(a, b){
  a = parseFloat(memory[memory.length-2]);
  b = parseFloat(memory[memory.length-1]);
  /* ENABLE FOR DEV ONLY
  console.log("result: " + result);
  console.log("result.value: " + result.value);
  console.log("operatorMem: " + operatorMem);
  console.log("memory: " + memory);
  console.log("inputOutput: " + inputOutput);
  console.log("inputOutput.innerText: " + inputOutput.innerText);
  */
 
  if (operatorMem[operatorMem.length-1] != operatorMem[operatorMem.length-2]){
    operator = operatorMem[operatorMem.length-2]; // Gives = This is key to letting =
    // or Return operate with the previously stored operator
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
  settleMemory(); // Function to keep memory array down to length of 4.
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
  showResult();
  checkIO(); // Keep the screen under 999,999,999
  settleMemory(); // Keep memory array down to length of 5.
  lolightOperator(); // Remove operator buttin highlight class.
};

function doBackspace(){
  if (inputOutput.innerText != ''){
    let string = inputOutput.innerText;
    inputOutput.innerText = string.substring(0, string.length-1);
    if (result.value != null){
      result.value = string.substring(0, string.length-1);
    }
  }
};

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
    } else {
      clearIO();
      unlockDecimal();
    }
  });
});

// Auto-calculate for Exponent and Square root.

autoCalcBtn.forEach(function (i){
  i.addEventListener('click', () => {
    if (inputOutput.innerText != ''
    && inputOutput.innerText != '.'){
      memory.push(parseFloat(inputOutput.innerText));
      operatorMem.push(i.getAttribute('id'));
    }
    autoCalc();
  });
});


// For Operation Style

function changeButton(e) {
  for (let i = 0; i < oldActive.length; i++) {
    oldActive[i].classList.remove("active-op");
  }
  e.target.classList.add("active-op");
};

function lolightOperator(){
  for (let i = 0; i < oldActive.length; i++) {
    oldActive[i].classList.remove("active-op");
  }
};

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", changeButton);
};



// AC Clears Memory and Clears screen .io
 clear.addEventListener('click', () => {
  memBlur();
});

// Equates two values without introducing a new operator.
// I.e. use the most recent operator available.
equals.addEventListener('click', () => {
  equate();
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
const equalsRegex = /Enter$/;
const backspaceRegex = /Backspace$/;
const decimalRegex = /\./;
const escapeRegex = /Escape$/;

// What kind of key was pressed? Numkey, Operator, or Equals?
window.addEventListener('keydown', function(e){
  // console.log(e.key); For dev only

  if (e.key == "+"){
    console.log(e.key);
    document.getElementById('plus').classList.add('active-op');    
  } else if (e.key == "-"){
    let newActive = document.getElementById('minus');
    newActive.classList.add('active-op');    
  } else if (e.key == "*"){
    let newActive = document.getElementById('multiplies');
    newActive.classList.add('active-op');    
  } else if (e.key == "/"){
    let newActive = document.getElementById('divides');
    newActive.classList.add('active-op');
  }

  if (e.key.match(numbersRegex)){
    if (result.value != null){ // If there is a result.value is on screen,
      clearIO();  // clear it the next time a number is entered
      result.value = null;
      }
      if (blinker.classList.contains('blinking-cursor')){
      // This also never goes to memory or operator memory,
      // because those can't take empty content or a period.
      inputOutput.innerText += e.key; 
      checkIO();
      };
    } else if (e.key.match(decimalRegex)){
        if (decimalSetting.value == 'unlocked'){
          inputOutput.innerText += e.key;
          checkIO();
        }
      decimalSetting.value = 'locked';
      toggleDecimal();
    } else if (e.key.match(backspaceRegex)){
      doBackspace();
    } else if (e.key.match(escapeRegex)){
      memBlur();
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
|        END OF KEYDOWNS        |
 \ ========================== */
