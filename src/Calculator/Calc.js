import React, { useState } from 'react';
import './Calc.css';
import Data from '../Data.json'
const Calc = () => {
    const digits = Data.filter(item => item.digit);
    const operators = Data.find(item => item.operators)?.operators || [];

    const [display, setDisplay] = useState('0');
    const [currentNumber, setCurrentNumber] = useState('');
    const [previousNumber, setPreviousNumber] = useState('');
    const [operator, setOperator] = useState('');

    const handleNumberClick = (num) => {
        if (display === '0') {
            setDisplay(num);
        } else {
            setDisplay(display + num);
        }
        setCurrentNumber(currentNumber + num);
    };

    const handleOperatorClick = (op) => {
        if (currentNumber === '') return; // Prevent operator usage before entering a number
        if (previousNumber !== '') {
            handleEquals();
        }
        setOperator(op);
        setPreviousNumber(currentNumber);
        setCurrentNumber('');
        setDisplay(display + ' ' + op + ' ');
    };

    const handleEquals = () => {
        if (currentNumber === '' || previousNumber === '') return;

        const num1 = parseFloat(previousNumber);
        const num2 = parseFloat(currentNumber);
        let result = 0;

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            case '%':
                result = num1 % num2;
                break;
            default:
                return;
        }

        setDisplay(result.toString());
        setCurrentNumber(result.toString());
        setPreviousNumber('');
        setOperator('');
    };

    const handleClear = () => {
        setDisplay('0');
        setCurrentNumber('');
        setPreviousNumber('');
        setOperator('');
    };

    return (
        <div className="calculator">
            <input type="text" className="calculator-screen" value={display} disabled />
            <div className="calculator-keys">
            {digits.map((items) =>
                    <button key={items.id} className="key-number" onClick={() => handleNumberClick(items.digit)}>{items.digit}</button>
                )}
                {operators.map((items) =>
                    <button key={items.id} className="key-operator" onClick={() => handleOperatorClick(items.operator)}>{items.operator}</button>
                )}
                <button className="key-clear" onClick={handleClear}>AC</button>
                <button className="key-equal" onClick={handleEquals}>=</button>
            </div>
        </div>
    );
};

export default Calc;