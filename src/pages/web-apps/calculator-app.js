// import * as React from "react"
import React, { useState, useEffect } from 'react';
import { Link } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [operator, setOperator] = useState(null);
  const [prevValue, setPrevValue] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleEquals();
      } else if (event.key >= '0' && event.key <= '9') {
        handleNumberClick(event.key);
      } else if (['+', '-', '*', '/'].includes(event.key)) {
        handleOperatorClick(event.key);
      } else if (event.key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display, operator, prevValue]);

  const handleNumberClick = (num) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const handleOperatorClick = (op) => {
    if (prevValue === null) {
      setPrevValue(parseFloat(display));
      setDisplay('0');
    } else {
      handleEquals();
    }
    setOperator(op);
  };

  const handleEquals = () => {
    if (operator && prevValue !== null) {
      const current = parseFloat(display);
      let result;
      switch (operator) {
        case '+':
          result = prevValue + current;
          break;
        case '-':
          result = prevValue - current;
          break;
        case '*':
          result = prevValue * current;
          break;
        case '/':
          result = prevValue / current;
          break;
        case '%':
          result = prevValue * (current / 100);
          break;
        default:
          return;
      }
      const calculationString = `${prevValue} ${operator} ${current} = ${result}`;
      setHistory([{ calculation: calculationString, result: result }, ...history]);
      setDisplay(result.toString());
      setPrevValue(null);
      setOperator(null);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setOperator(null);
    setPrevValue(null);
  };

  const handleBackspace = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const handleToggleSign = () => {
    setDisplay(parseFloat(display) * -1 + '');
  };

  const handlePercent = () => {
    setDisplay(parseFloat(display) / 100 + '');
  };

  const handleHistoryClick = (result) => {
    setDisplay(result.toString());
    setPrevValue(null);
    setOperator(null);
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">{display}</div>
        <div className="buttons">
          <button onClick={handlePercent} className="function">%</button>
          <button onClick={handleClear} className="function">CE</button>
          <button onClick={handleClear} className="function">C</button>
          <button onClick={handleBackspace} className="function">⌫</button>
          <button onClick={() => handleNumberClick('7')}>7</button>
          <button onClick={() => handleNumberClick('8')}>8</button>
          <button onClick={() => handleNumberClick('9')}>9</button>
          <button onClick={() => handleOperatorClick('/')} className="operator">÷</button>
          <button onClick={() => handleNumberClick('4')}>4</button>
          <button onClick={() => handleNumberClick('5')}>5</button>
          <button onClick={() => handleNumberClick('6')}>6</button>
          <button onClick={() => handleOperatorClick('*')} className="operator">×</button>
          <button onClick={() => handleNumberClick('1')}>1</button>
          <button onClick={() => handleNumberClick('2')}>2</button>
          <button onClick={() => handleNumberClick('3')}>3</button>
          <button onClick={() => handleOperatorClick('-')} className="operator">-</button>
          <button onClick={handleToggleSign} className="function">±</button>
          <button onClick={() => handleNumberClick('0')}>0</button>
          <button onClick={() => handleNumberClick('.')}>.</button>
          <button onClick={() => handleOperatorClick('+')} className="operator">+</button>
          <button onClick={handleEquals} className="equals" style={{gridColumn: "span 4"}}>=</button>
        </div>
      </div>
      <div className="history">
        <h2>계산 기록</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index} onClick={() => handleHistoryClick(item.result)}>
              {item.calculation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const CalculatorApp = () => (
  <Layout>
    <div className="app">
      <h1>React Calculator</h1>
      <Calculator />
    </div>

    <Link to="/">Go back to the homepage</Link>
  </Layout>
)


// Styles
const styles = `
  body {
    background-color: #f5f5f5;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .app {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  
  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
  }
  
  .calculator-container {
    display: flex;
    justify-content: space-between;
  }
  
  .calculator {
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 20px;
    width: 350px;
    background-color: #f9f9f9;
  }
  
  .display {
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    font-size: 28px;
    height: 60px;
    line-height: 60px;
    margin-bottom: 20px;
    padding: 0 15px;
    text-align: right;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  
  button {
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    font-size: 18px;
    height: 50px;
    transition: all 0.2s;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #f0f0f0;
  }

  button:active {
    transform: scale(0.95);
  }
  
  .operator {
    background-color: #f0f0f0;
    color: #333;
  }

  .equals {
    background-color: #4CAF50;
    color: white;
  }

  .function {
    background-color: #e0e0e0;
  }
  
  .history {
    width: 300px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 20px;
    margin-left: 20px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .history h2 {
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 15px;
    color: #333;
    text-align: center;
  }
  
  .history ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    max-height: 350px;
    overflow-y: auto;
  }
  
  .history li {
    margin-bottom: 10px;
    font-size: 16px;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
    cursor: pointer;
  }

  .history li:hover {
    background-color: #f0f0f0;
  }
`;

// Add styles to the document
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);

export const Head = () => <Seo title="Simple calculator for use in your web browser" />

export default CalculatorApp
