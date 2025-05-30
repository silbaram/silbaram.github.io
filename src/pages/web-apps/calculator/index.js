import React, { useEffect, useState } from "react"

import Seo from "../../../components/seo";
import ProjectDetail from "../../../components/ProjectDetail"
import * as calculatorAppStyles from "./css/calculator-app.module.css"

const CalculatorComponent = () => {
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
    <div className={calculatorAppStyles.calculatorContainer}>
      <div className={calculatorAppStyles.calculator}>
        <div className={calculatorAppStyles.display}>{display}</div>
        <div className={calculatorAppStyles.buttons}>
          <button onClick={handlePercent} className={calculatorAppStyles.functionButton}>%</button>
          <button onClick={handleClear} className={calculatorAppStyles.functionButton}>CE</button>
          <button onClick={handleClear} className={calculatorAppStyles.functionButton}>C</button>
          <button onClick={handleBackspace} className={calculatorAppStyles.functionButton}>⌫</button>
          <button onClick={() => handleNumberClick('7')}>7</button>
          <button onClick={() => handleNumberClick('8')}>8</button>
          <button onClick={() => handleNumberClick('9')}>9</button>
          <button onClick={() => handleOperatorClick('/')} className={calculatorAppStyles.operator}>÷</button>
          <button onClick={() => handleNumberClick('4')}>4</button>
          <button onClick={() => handleNumberClick('5')}>5</button>
          <button onClick={() => handleNumberClick('6')}>6</button>
          <button onClick={() => handleOperatorClick('*')} className={calculatorAppStyles.operator}>×</button>
          <button onClick={() => handleNumberClick('1')}>1</button>
          <button onClick={() => handleNumberClick('2')}>2</button>
          <button onClick={() => handleNumberClick('3')}>3</button>
          <button onClick={() => handleOperatorClick('-')} className={calculatorAppStyles.operator}>-</button>
          <button onClick={handleToggleSign} className={calculatorAppStyles.functionButton}>±</button>
          <button onClick={() => handleNumberClick('0')}>0</button>
          <button onClick={() => handleNumberClick('.')}>.</button>
          <button onClick={() => handleOperatorClick('+')} className={calculatorAppStyles.operator}>+</button>
          <button onClick={handleEquals} className={calculatorAppStyles.equals} style={{gridColumn: "span 4"}}>=</button>
        </div>
      </div>
      <div className={calculatorAppStyles.history}>
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
  <ProjectDetail title={"계산기"} isFullscreen={false}>
    <div className="calculatorAppStyles.app">
      <CalculatorComponent />
    </div>
  </ProjectDetail>
)

export const Head = () => <Seo title="Simple calculator for use in your web browser" />

export default CalculatorApp
