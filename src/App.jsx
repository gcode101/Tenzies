import { useState, useEffect } from 'react'
import './App.css'
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(allNewDice());

  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    if (won()){
      setTenzies(true)
    }
  }, [dice]);

  function won() {
    let results = true;
    const compValue = dice[0].value;
    dice.map(die => {
      if (!die.isHeld || compValue !== die.value){
        results = false;
      }
    });
    return results;
  }

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
    if (!tenzies){
        const resultArr = dice.map(die => {
        if (!die.isHeld){
          const randomNum = Math.ceil(Math.random() * 6);
          return {...die, value: randomNum}
        }else{
          return die;
        }
      });
      setDice(resultArr);
    }else{
      setTenzies(false);
      setDice(allNewDice());
    }
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
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.
      </p>
      <div className="dice">
        {diceElements}
      </div>
      <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App 
