import React, { useEffect, useState } from "react"

import Seo from "../../../components/Seo"
import ProjectDetail from "../../../components/ProjectDetail"
import * as calculatorAppStyles from "./css/calculator-app.module.css"

const operatorSymbols = {
  "+": "+",
  "-": "-",
  "*": "×",
  "/": "÷",
  "%": "%",
}

const formatResult = value => {
  if (!Number.isFinite(value)) {
    return "Error"
  }

  return Number.parseFloat(value.toFixed(10)).toString()
}

const calculateResult = (leftValue, rightValue, currentOperator) => {
  switch (currentOperator) {
    case "+":
      return leftValue + rightValue
    case "-":
      return leftValue - rightValue
    case "*":
      return leftValue * rightValue
    case "/":
      return leftValue / rightValue
    case "%":
      return leftValue * (rightValue / 100)
    default:
      return Number.NaN
  }
}

const CalculatorComponent = () => {
  const [display, setDisplay] = useState("0")
  const [operator, setOperator] = useState(null)
  const [prevValue, setPrevValue] = useState(null)
  const [history, setHistory] = useState([])
  const [waitingForNextValue, setWaitingForNextValue] = useState(false)

  const resetCalculator = () => {
    setDisplay("0")
    setOperator(null)
    setPrevValue(null)
    setWaitingForNextValue(false)
  }

  const pushHistory = (leftValue, currentOperator, rightValue, result) => {
    setHistory(currentHistory => [
      {
        calculation: `${formatResult(leftValue)} ${
          operatorSymbols[currentOperator]
        } ${formatResult(rightValue)} = ${result}`,
        result,
      },
      ...currentHistory,
    ])
  }

  const handleNumberClick = num => {
    if (display === "Error") {
      setDisplay(num === "." ? "0." : num)
      setWaitingForNextValue(false)
      return
    }

    if (waitingForNextValue) {
      setDisplay(num === "." ? "0." : num)
      setWaitingForNextValue(false)
      return
    }

    if (num === ".") {
      setDisplay(currentDisplay =>
        currentDisplay.includes(".") ? currentDisplay : `${currentDisplay}.`
      )
      return
    }

    setDisplay(currentDisplay =>
      currentDisplay === "0" ? num : currentDisplay + num
    )
  }

  const handleOperatorClick = nextOperator => {
    if (display === "Error") {
      return
    }

    const currentValue = Number.parseFloat(display)
    if (Number.isNaN(currentValue)) {
      return
    }

    if (prevValue !== null && waitingForNextValue) {
      setOperator(nextOperator)
      return
    }

    if (prevValue === null) {
      setPrevValue(currentValue)
    } else if (operator) {
      const result = calculateResult(prevValue, currentValue, operator)
      const formattedResult = formatResult(result)

      if (formattedResult === "Error") {
        resetCalculator()
        setDisplay("Error")
        return
      }

      pushHistory(prevValue, operator, currentValue, formattedResult)
      setDisplay(formattedResult)
      setPrevValue(Number.parseFloat(formattedResult))
    }

    setOperator(nextOperator)
    setWaitingForNextValue(true)
  }

  const handleEquals = () => {
    if (
      display === "Error" ||
      operator === null ||
      prevValue === null ||
      waitingForNextValue
    ) {
      return
    }

    const currentValue = Number.parseFloat(display)
    const result = calculateResult(prevValue, currentValue, operator)
    const formattedResult = formatResult(result)

    if (formattedResult === "Error") {
      resetCalculator()
      setDisplay("Error")
      return
    }

    pushHistory(prevValue, operator, currentValue, formattedResult)
    setDisplay(formattedResult)
    setPrevValue(null)
    setOperator(null)
    setWaitingForNextValue(true)
  }

  const handleClearEntry = () => {
    if (display === "Error") {
      resetCalculator()
      return
    }

    setDisplay("0")
    setWaitingForNextValue(false)
  }

  const handleBackspace = () => {
    if (display === "Error") {
      resetCalculator()
      return
    }

    if (waitingForNextValue) {
      return
    }

    setDisplay(currentDisplay =>
      currentDisplay.length > 1 ? currentDisplay.slice(0, -1) : "0"
    )
  }

  const handleToggleSign = () => {
    if (display === "0" || display === "Error") {
      return
    }

    setDisplay(currentDisplay =>
      currentDisplay.startsWith("-")
        ? currentDisplay.slice(1)
        : `-${currentDisplay}`
    )
  }

  const handlePercent = () => {
    if (display === "Error") {
      return
    }

    const currentValue = Number.parseFloat(display)
    if (Number.isNaN(currentValue)) {
      return
    }

    const nextValue =
      prevValue !== null && operator
        ? prevValue * (currentValue / 100)
        : currentValue / 100

    setDisplay(formatResult(nextValue))
    setWaitingForNextValue(false)
  }

  const handleHistoryClick = result => {
    setDisplay(result)
    setPrevValue(null)
    setOperator(null)
    setWaitingForNextValue(true)
  }

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === "Enter") {
        event.preventDefault()
        handleEquals()
      } else if ((event.key >= "0" && event.key <= "9") || event.key === ".") {
        handleNumberClick(event.key)
      } else if (["+", "-", "*", "/"].includes(event.key)) {
        handleOperatorClick(event.key)
      } else if (event.key === "Backspace") {
        handleBackspace()
      } else if (event.key === "Escape") {
        resetCalculator()
      } else if (event.key === "%") {
        handlePercent()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [display, operator, prevValue, waitingForNextValue])

  const pendingValueLabel =
    prevValue !== null ? formatResult(prevValue) : "Ready"
  const operatorLabel = operator ? operatorSymbols[operator] : "None"

  return (
    <div className={calculatorAppStyles.calculatorContainer}>
      <section className={calculatorAppStyles.calculator}>
        <div className={calculatorAppStyles.calculatorHeader}>
          <p className={calculatorAppStyles.eyebrow}>Calculator</p>
        </div>

        <div className={calculatorAppStyles.displayCard}>
          <div className={calculatorAppStyles.displayMeta}>
            <span>Stored {pendingValueLabel}</span>
            <span>Operator {operatorLabel}</span>
          </div>
          <div className={calculatorAppStyles.display} aria-live="polite">
            {display}
          </div>
          <div className={calculatorAppStyles.helperRow}>
            <p className={calculatorAppStyles.helperText}>
              `Enter` 계산 / `Esc` 초기화
            </p>
          </div>
        </div>

        <div className={calculatorAppStyles.buttons}>
          <button
            type="button"
            onClick={handlePercent}
            className={`${calculatorAppStyles.button} ${calculatorAppStyles.functionButton}`}
          >
            %
          </button>
          <button
            type="button"
            onClick={handleClearEntry}
            className={`${calculatorAppStyles.button} ${calculatorAppStyles.functionButton}`}
          >
            CE
          </button>
          <button
            type="button"
            onClick={resetCalculator}
            className={`${calculatorAppStyles.button} ${calculatorAppStyles.functionButton}`}
          >
            C
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            className={`${calculatorAppStyles.button} ${calculatorAppStyles.functionButton}`}
            aria-label="Backspace"
          >
            ⌫
          </button>

          <button
            type="button"
            onClick={() => handleNumberClick("7")}
            className={calculatorAppStyles.button}
          >
            7
          </button>
          <button
            type="button"
            onClick={() => handleNumberClick("8")}
            className={calculatorAppStyles.button}
          >
            8
          </button>
          <button
            type="button"
            onClick={() => handleNumberClick("9")}
            className={calculatorAppStyles.button}
          >
            9
          </button>
          <button
            type="button"
            onClick={() => handleOperatorClick("/")}
            className={`${calculatorAppStyles.button} ${calculatorAppStyles.operator}`}
          >
            ÷
          </button>

          <button
            type="button"
            onClick={() => handleNumberClick("4")}
            className={calculatorAppStyles.button}
          >
            4
          </button>
          <button
            type="button"
            onClick={() => handleNumberClick("5")}
            className={calculatorAppStyles.button}
          >
            5
          </button>
          <button
            type="button"
            onClick={() => handleNumberClick("6")}
            className={calculatorAppStyles.button}
          >
            6
          </button>
          <button
            type="button"
            onClick={() => handleOperatorClick("*")}
            className={`${calculatorAppStyles.button} ${calculatorAppStyles.operator}`}
          >
            ×
          </button>

          <button
            type="button"
            onClick={() => handleNumberClick("1")}
            className={calculatorAppStyles.button}
          >
            1
          </button>
          <button
            type="button"
            onClick={() => handleNumberClick("2")}
            className={calculatorAppStyles.button}
          >
            2
          </button>
          <button
            type="button"
            onClick={() => handleNumberClick("3")}
            className={calculatorAppStyles.button}
          >
            3
          </button>
          <button
            type="button"
            onClick={() => handleOperatorClick("-")}
            className={`${calculatorAppStyles.button} ${calculatorAppStyles.operator}`}
          >
            -
          </button>

          <button
            type="button"
            onClick={handleToggleSign}
            className={`${calculatorAppStyles.button} ${calculatorAppStyles.functionButton}`}
          >
            ±
          </button>
          <button
            type="button"
            onClick={() => handleNumberClick("0")}
            className={calculatorAppStyles.button}
          >
            0
          </button>
          <button
            type="button"
            onClick={() => handleNumberClick(".")}
            className={calculatorAppStyles.button}
          >
            .
          </button>
          <button
            type="button"
            onClick={() => handleOperatorClick("+")}
            className={`${calculatorAppStyles.button} ${calculatorAppStyles.operator}`}
          >
            +
          </button>

          <button
            type="button"
            onClick={handleEquals}
            className={`${calculatorAppStyles.button} ${calculatorAppStyles.equals}`}
          >
            =
          </button>
        </div>
      </section>

      <aside className={calculatorAppStyles.history}>
        <div className={calculatorAppStyles.historyHeader}>
          <p className={calculatorAppStyles.historyEyebrow}>Memory</p>
          <h2 className={calculatorAppStyles.historyTitle}>계산 기록</h2>
          <p className={calculatorAppStyles.historyCopy}>
            최근 계산 결과를 카드처럼 모아두고, 한 번 탭해 다시 이어서 사용할 수
            있습니다.
          </p>
        </div>

        {history.length === 0 ? (
          <div className={calculatorAppStyles.emptyHistory}>
            <p className={calculatorAppStyles.emptyHistoryTitle}>
              아직 저장된 계산이 없습니다.
            </p>
            <p className={calculatorAppStyles.emptyHistoryCopy}>
              첫 계산을 마치면 이 영역에 정돈된 형태로 쌓입니다.
            </p>
          </div>
        ) : (
          <ul className={calculatorAppStyles.historyList}>
            {history.map((item, index) => (
              <li key={`${item.calculation}-${index}`}>
                <button
                  type="button"
                  onClick={() => handleHistoryClick(item.result)}
                  className={calculatorAppStyles.historyItem}
                >
                  <span className={calculatorAppStyles.historyExpression}>
                    {item.calculation}
                  </span>
                  <span className={calculatorAppStyles.historyAction}>
                    Reuse
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  )
}

const CalculatorApp = () => {
  return (
    <ProjectDetail mainClassName={calculatorAppStyles.page}>
      <div className={calculatorAppStyles.app}>
        <CalculatorComponent />
      </div>
    </ProjectDetail>
  )
}

export const Head = () => (
  <Seo
    title="Simple Calculator"
    description="A simple calculator app usable directly in your web browser."
    keywords={["calculator", "web calculator", "React", "Developer Tool"]}
  />
)

export default CalculatorApp
