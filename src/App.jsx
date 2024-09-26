import { useState } from "react"
import "./App.css"

function App() {
  
  let numberOptions = [1,2,3,4,5,6,7,8,9,0, '.', 'ANS']
  let operatorOptions = ['+', '-', '*', '/']

  const [values, setValues] = useState({
    firstNumber: null,
    operator: '+',
    secondNumber: null,
    result: 0,
  })
  
  const [stored, setStored] = useState(null)

  function clear(e){
    setValues(prev => ({
      ...prev,
      [e]: null
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

  function handleInput(event){
    setValues(prev => ({
      ...prev,
      [event.target.name]: (event.target.name === 'operator' || prev[event.target.value] === '0' ) ? event.target.value : 
      (event.target.value === 'ANS' ) ? stored :
      (
      (prev[event.target.name] === null || prev[event.target.name] === '0' ) ? event.target.value :
      
      `${prev[event.target.name] + event.target.value}`
      )
    }))
  }

  return (
    <div className="calculator">
      <div className="panel">
        <p>{values.firstNumber ? values.firstNumber : 0}</p>
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
        <p>{values.secondNumber ? values.secondNumber : 0}</p>
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
