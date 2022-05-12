let display = document.getElementById('display-container');
const mainContainer = document.getElementById('main-container');
const calcButtons = document.querySelectorAll('button');

let displayNum = 0;
let numOne = '';
let numTwo = '';
let operator = '';
let lastOperator = '';
let lastClick = '';
let result = '';

display.innerText = 0;

mainContainer.addEventListener('click', (event) => {
    if (event.target.id == 'main-container' || event.target.id == '') {
        return;
    } else if (event.target.id == 'equals' && numOne === '') {
        return;
    } else if (display.innerText == 0 && event.target.id == 'zero') {
        numOne = 0;
        lastClick = event.target.className;
    } else if (displayNum === '0.' && event.target.className == 'number') {
        buildNumber();
        lastClick = event.target.className;
    } else if (display.innerText == 0 && event.target.className == 'number') {
        newNumber();
        lastClick = event.target.className;
    } else if (display.innerText != 0 && lastClick == 'operator' && 
      event.target.className == 'number') {
        newNumber();
        lastClick = event.target.className;
    } else if (event.target.id != 'equals' && lastClick == 'equals' && result != '' 
        && event.target.className == 'number') {
        newNumber();
        lastClick = event.target.className;
    } else if (event.target.id == 'clear') {
        clear();
        lastClick = event.target.className;
    } else if (event.target.id == 'posneg') {
        posNeg();
        lastClick = event.target.className;
    } else if (event.target.id == 'percent') {
        percent();
        lastClick = event.target.className;
    } else if (event.target.id == 'decimal' && lastClick == 'operator' || event.target.id == 'decimal' && lastClick == 'equals') {
        newDecimalNumber();
        lastClick = event.target.className;
    } else if (event.target.className == 'operator' && numOne != '' && lastClick == 'number') {
        numTwo = displayNum;
        result = operate(parseFloat(numOne), operator, parseFloat(numTwo));
        display.innerText = shortenNumber(result);
        displayNum = result;
        numOne = result;
        lastClick = event.target.className;
        operator = event.target.innerText;
    } else if (event.target.id == 'decimal') {
        decimal();
        lastClick = event.target.className;
    } else if (event.target.id == 'number' && lastClick == 'equals') {
        numOne = '';
        newNumber();
        lastClick = event.target.className;
    } else if (event.target.id == 'equals' && result != '' && lastClick == 'number') {
        numTwo = displayNum;
        result = operate(parseFloat(numOne), operator, parseFloat(numTwo));
        shortenNumber(result)
        display.innerText = shortenNumber(result);
        displayNum = result;
        numOne = result;
        lastClick = event.target.className;
    } else if (event.target.id == 'equals' && result != '') {
        result = operate(parseFloat(numOne), operator, parseFloat(numTwo));
        shortenNumber(result)
        display.innerText = shortenNumber(result);
        displayNum = result;
        numOne = result;
        lastClick = event.target.className;
    } else if (event.target.id == 'equals') {
        numTwo = displayNum;
        result = operate(parseFloat(numOne), operator, parseFloat(numTwo));
        display.innerText = shortenNumber(result);
        displayNum = result;
        numOne = result;
        lastClick = event.target.className;
    } else if (event.target.className == 'operator') {
        if (numOne == '') {
        numOne = displayNum;
        operator = event.target.innerText;
        calcButtons[17].disabled = false;
        lastClick = event.target.className;
        } else {
            numOne = displayNum;
            operator = event.target.innerText;
            lastClick = event.target.className;
        }
    } else {
        buildNumber();
        lastClick = event.target.className;
    } console.dir(event.target);
});

function clear() {
    displayNum = 0;
    display.innerText = displayNum;
    calcButtons[17].disabled = false;
    numOne = '';
    numTwo = '';
    operator = '';
    result = '';
};

function posNeg() {
    if (displayNum.toString().includes('-') == false) {
        displayNum = '-' + displayNum;
        display.innerText = displayNum;
    } else {
        displayNum = displayNum.slice(1);
        display.innerText = displayNum;
    };
};

function percent() {
    displayNum = displayNum / 100;
    display.innerText = displayNum;
    calcButtons[17].disabled = true;
};

function decimal() {
    displayNum = displayNum + '.';
    display.innerText = displayNum;
    calcButtons[17].disabled = true;
};

function newNumber() {
    displayNum = event.target.innerText;
    display.innerText = displayNum;
};

function newDecimalNumber() {
    displayNum = '0' + event.target.innerText;
    display.innerText = displayNum;
};

function buildNumber() {
    displayNum += event.target.innerText;
    display.innerText = displayNum;
};

function add(numOne, numTwo) {
    return numOne + numTwo;
};

function subtract(numOne, numTwo) {
    return numOne - numTwo;
};

function multiply(numOne, numTwo) {
    return numOne * numTwo;
};

function divide(numOne, numTwo) {
    return numOne / numTwo;
};

function operate(numOne, operator, numTwo) {
    let result;
    switch (operator) {
        case '+':
            result = add(numOne, numTwo);
            break;
        case '-':
            result = subtract(numOne, numTwo);
            break;
        case 'x':
            result = multiply(numOne, numTwo);
            break;
        case '÷':
            if (numTwo == 0) {
                return 'Error'
            }
            result = divide(numOne, numTwo);
            break;
    }
    return result;
};

function shortenNumber(result) {
    if (result.toString().indexOf('.') != -1 && result.toString().length >= 14) {
        result = Math.round(result);
        console.log('shortened')
        return result;
    } else {
        return;
    }
}