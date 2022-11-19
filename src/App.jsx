import { useState } from 'react'
import './App.css'
import Die from './components/Die'
import {nanoid} from 'nanoid'

function App() {

  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    const diceObjects = [];
    for (let i = 0; i < 10; i++){
      const randomNum = Math.ceil(Math.random() * 6);
      const die = {value: randomNum, isHeld: false, id: nanoid()};
      diceObjects.push(die);
    }
    return diceObjects;
  }

  function rollDice() {
    // setDice(oldDice => oldDice.map(die => {
    //     return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
    //  }))
    const resultArr = dice.map(die => {
      if (!die.isHeld){
        const randomNum = Math.ceil(Math.random() * 6);
        return {...die, value: randomNum}
      }else{
        return die;
      }
    });
    setDice(resultArr);
  }

  function holdDice(id) {
   const newDice = dice.map(die => {
      if(die.id === id){
        return {...die, isHeld: !die.isHeld};
      }else {
        return die;
      }
   });
   setDice(newDice);
  }

  const diceElements = dice.map(die => (
      <Die 
        key={die.id}
        id={die.id} 
        value={die.value} 
        isHeld={die.isHeld}
        activeDice={holdDice}
      />
    ));

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
