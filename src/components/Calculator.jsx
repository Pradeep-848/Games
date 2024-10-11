import React, { useState, useEffect } from "react";
import "../styles/Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  // Load history from localStorage on component mount
  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("calculatorHistory")) || [];
    setHistory(storedHistory);
  }, []);

  // Save history to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("calculatorHistory", JSON.stringify(history));
  }, [history]);

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const handleEqual = () => {
    try {
      const evalResult = eval(input);
      setResult(evalResult);
      addToHistory(input, evalResult);
    } catch (error) {
      setResult("Error");
    }
  };

  const handleScientific = (type) => {
    let scientificResult;
    try {
      switch (type) {
        case "sqrt":
          scientificResult = Math.sqrt(eval(input));
          break;
        case "square":
          scientificResult = Math.pow(eval(input), 2);
          break;
        case "log":
          scientificResult = Math.log(eval(input));
          break;
        case "sin":
          scientificResult = Math.sin(eval(input));
          break;
        case "cos":
          scientificResult = Math.cos(eval(input));
          break;
        default:
          break;
      }
      setResult(scientificResult);
      addToHistory(`${type}(${input})`, scientificResult);
    } catch (error) {
      setResult("Error");
    }
  };

  const addToHistory = (calculation, result) => {
    const newHistory = [...history, { calculation, result }];
    setHistory(newHistory);
  };

  const handleDeleteHistory = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
  };

  return (
    <div className="container">
      <div className="calculator-container">
        <div className="calculator-screen">
          <div className="calculator-input">{input || "0"}</div>
          <div className="calculator-result">{result}</div>
        </div>

        <div className="calculator-buttons">
          <button onClick={handleClear} className="button-clear">
            C
          </button>
          <button onClick={() => handleClick("/")} className="button-operator">
            ÷
          </button>
          <button onClick={() => handleClick("*")} className="button-operator">
            ×
          </button>
          <button onClick={() => handleClick("-")} className="button-operator">
            −
          </button>

          <button onClick={() => handleClick("7")} className="button-number">
            7
          </button>
          <button onClick={() => handleClick("8")} className="button-number">
            8
          </button>
          <button onClick={() => handleClick("9")} className="button-number">
            9
          </button>
          <button onClick={() => handleClick("+")} className="button-operator">
            +
          </button>

          <button onClick={() => handleClick("4")} className="button-number">
            4
          </button>
          <button onClick={() => handleClick("5")} className="button-number">
            5
          </button>
          <button onClick={() => handleClick("6")} className="button-number">
            6
          </button>
          <button onClick={handleEqual} className="button-equal">
            =
          </button>

          <button onClick={() => handleClick("1")} className="button-number">
            1
          </button>
          <button onClick={() => handleClick("2")} className="button-number">
            2
          </button>
          <button onClick={() => handleClick("3")} className="button-number">
            3
          </button>
          <button onClick={() => handleClick(".")} className="button-number">
            .
          </button>

          <button onClick={() => handleClick("0")} className="button-zero">
            0
          </button>
        </div>

        {/* Scientific buttons */}
        <div className="scientific-buttons">
          <button
            onClick={() => handleScientific("sqrt")}
            className="button-scientific"
          >
            √
          </button>
          <button
            onClick={() => handleScientific("square")}
            className="button-scientific"
          >
            x²
          </button>
          <button
            onClick={() => handleScientific("log")}
            className="button-scientific"
          >
            log
          </button>
          <button
            onClick={() => handleScientific("sin")}
            className="button-scientific"
          >
            sin
          </button>
          <button
            onClick={() => handleScientific("cos")}
            className="button-scientific"
          >
            cos
          </button>
        </div>

        <hr />

        {/* History section */}
        <div className="history-section">
          <h2 style={{ color: "black" }}>Calculation History</h2>
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                <span style={{ color: "black", fontSize: "18px" }}>
                  {entry.calculation} = {entry.result}
                </span>
                <button
                  onClick={() => handleDeleteHistory(index)}
                  className="button-delete"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
