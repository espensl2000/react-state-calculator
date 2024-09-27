import { useState } from "react"
import "./App.css"

function App() {
  
  let numberOptions = [1,2,3,4,5,6,7,8,9,0, '.', 'ANS']
  let operatorOptions = ['+', '-', '*', '/']

  const [values, setValues] = useState({
    firstNumber: '0',
    operator: '+',
    secondNumber: '0',
    result: 0,
  })
  
  const [stored, setStored] = useState('0')
  
  function clear(e){
    setValues(prev => ({
      ...prev,
      [e]: '0'
    }))
  }

  function calculate(){
    let first = values.firstNumber ? values.firstNumber : 0
    let second = values.secondNumber ? values.secondNumber : 0
    let results = (eval(first + values.operator + second));
    setValues(prev => ({
      ...prev,
      result: results
    }))
  }

  function handleInput(event) {
    const { name, value } = event.target;
  
    setValues(prev => {
      const currentValue = prev[name];
      if (value === 'ANS') {
        return { ...prev, [name]: stored };
      }
      if(currentValue.length === 1 && currentValue.charAt(0) === '0' ){
        console.log("hit")
        return {...prev, [name]: value}
      }
      
      if (name === 'operator') {
        return { ...prev, [name]: value };
      }
  
      if (value === '.' && currentValue.toString().includes('.')) {
        return prev; 
      }
      const newValue = currentValue === null || currentValue === '0' ? value : `${currentValue}${value}`;
      return { ...prev, [name]: newValue };
    });
  }

  return (
    <div className="calculator">
      <div className="panel">
        <p>{values.firstNumber}</p>
        <div className="numbers">
          {numberOptions.map((n) => (
            <>
              <button name="firstNumber" value={n} onClick={handleInput}>{n}</button>
            </>
          ))}
          <button onClick={() => clear('firstNumber')}>Clear</button>

        </div>
      </div>

      <div className="panel">
        <p>{values.operator}</p>
        <div className="numbers">
          {operatorOptions.map((o) => (
            <>
              <button name="operator" value={o} onClick={handleInput}>{o}</button>
            </>
          ))}
        </div>
      </div>

      <div className="panel">
        <p>{values.secondNumber}</p>
        <div className="numbers">
          {numberOptions.map((n) => (
            <>
            <button name="secondNumber" value={n} onClick={handleInput}>{n}</button>
            </>
          ))}
          <button onClick={() => clear('secondNumber')}>Clear</button>
        </div>
      </div>
      <div className="panel answer">
        <p>{values.result}</p>
        <div>
          <button onClick={() => calculate()}>=</button>
          <button onClick={() => setStored(values.result)}>STORE</button>
        </div>
      </div>
    </div>
  )
}

export default App
