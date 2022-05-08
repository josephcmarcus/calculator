let answer = 0;

function clear() {
    answer = 0;
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
        case '*':
            result = multiply(numOne, numTwo);
            break;
        case '/':
            result = divide(numOne, numTwo);
            break;
    }
    return result;
};