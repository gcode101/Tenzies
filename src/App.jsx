import { useState, useEffect } from 'react'
import './App.css'
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [scoreTimer, setScoreTimer] = useState(performance.now());


  useEffect(() => {
    if (won()){
      setTenzies(true)
      const start = scoreTimer;
      const end = performance.now();
      setScoreTimer(end - start);
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

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    milliseconds = milliseconds % 1000;
    seconds = seconds % 60;
    minutes = minutes % 60;
    // hours = hours % 24;

    return `${padTo2Digits(minutes)} m ${padTo2Digits(
      seconds)} s ${Math.floor(milliseconds)} ms`;
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
      setScoreTimer(performance.now());
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
    <div>
      {
          (tenzies) ? 
          <main className="container">
            <h1 className="title">You win!</h1>
            <h4>Your Score: {convertMsToTime(scoreTimer)}</h4>
            <h4>Highest Score: </h4>
            <div className="dice">
              {diceElements}
            </div>
            <button onClick={rollDice}>{"Play Again"}</button>
            <Confetti />
          </main> 
          :
          <main className="container">
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
              Roll until all dice are the same. 
              Click each die to freeze it at its current value between rolls.
            </p>
            <div className="dice">
              {diceElements}
            </div>
            <button onClick={rollDice}>{"Roll"}</button>
          </main>
      }
    </div>
  )
}

export default App 
