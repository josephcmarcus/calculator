const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

let updateDisplay = () => {
    const display = document.querySelector('#display-container');
    display.innerText = calculator.displayValue;
};

updateDisplay();

const keys = document.querySelectorAll('.calculator-keys');
for (key of keys) {
    key.addEventListener('click', (event) => {
        const { target } = event;
        if (!target.matches('button')) {
            return;
        }
        switch (target.innerText) {
            case '+':
            case '-':
            case 'x':
            case '÷':
            case '=':
                handleOperator(target.innerText);
                break;
            case '.':
                inputDecimal(target.innerText);
                break;
            case 'C':
                resetCalculator();
                break;
            case '%':
                makePercent();
                break;
            case '+/-':
                makePosNeg();
                break;
            default:
                if (Number.isInteger(parseFloat(target.innerText))) {
                    inputNumber(target.innerText);
                }
        }
        updateDisplay();
    });
}

let inputNumber = (number) => {
    const { displayValue, waitingForSecondOperand } = calculator;
    if (waitingForSecondOperand === true) {
        calculator.displayValue = number;
        calculator.waitingForSecondOperand = false;
    } else {
    calculator.displayValue = displayValue === '0' ? number : displayValue + number;
    };
    console.log(calculator);
};

let inputDecimal = (decimal) => {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.'
        calculator.waitingForSecondOperand = false;
        return;
    }
    if (!calculator.displayValue.includes(decimal)) {
        calculator.displayValue += decimal;
    };
};

let handleOperator = (nextOperator) => {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }
    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    };
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator
    console.log(calculator);
};

let makePercent = (number) => {
    const { displayValue } = calculator;
    if (calculator.displayvalue === '0') {
        return;
    }
    calculator.displayValue = `${displayValue / 100}`.toString();
};

let makePosNeg = (number) => {
    const { displayValue } = calculator;
    if (calculator.displayValue === '0') {
        return;
    }
    if (calculator.waitingForSecondOperand === true) {
        if (!calculator.displayValue.includes('-')) {
        calculator.displayValue = `-${displayValue}`;
        calculator.firstOperand = parseFloat(calculator.displayValue);
        return;
        } else {
            calculator.displayValue = displayValue.replace('-', '');
            calculator.firstOperand = parseFloat(calculator.displayValue);
            return;
        }
    }
    if (!calculator.displayValue.includes('-')) {
        calculator.displayValue = `-${displayValue}`;
        return;
    }
    calculator.displayValue = displayValue.replace('-', '');
};

let calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case 'x':
            return firstOperand * secondOperand;
        case '÷':
            return firstOperand / secondOperand;
    };
    return secondOperand;
};

let resetCalculator = () => {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
};