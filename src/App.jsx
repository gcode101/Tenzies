import { useState } from 'react'
import './App.css'
import Die from './components/Die'

function App() {

  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    const numbers = [];
    for (let i = 0; i < 10; i++){
      const randomNum = Math.ceil(Math.random() * 6);
      numbers.push(randomNum);
    }
    return numbers;
  }

  function rollDice() {
    setDice(allNewDice())
  }

  const diceElements = dice.map(die => (<Die value={die}/>));

  return (
    <main className="container">
      <div className="dice">
        {diceElements}
      </div>
      <button onClick={rollDice}>Roll</button>
    </main>
  )
}

export default App 
