import React, { useState, useEffect, useContext } from 'react';



const axios = require('axios');
import Selector from './Selector.jsx'
import { AnswerContext } from './AppRoot.jsx'


const Game = (context) => {
  const answer = useContext(AnswerContext)
  const [guess, setGuess] = useState('')
  const [guess1, setGuess1] = useState('')
  const [guess2, setGuess2] = useState('')
  const [guess3, setGuess3] = useState('')
  const [guess4, setGuess4] = useState('')
  const [guesses, setGuesses] = useState(0);
  const [limit, setLimit] = useState(10)
  const [possibleAnswers,setPossibleAnswers] = useState(new Array(8).fill(0))
  const handleChange = (e) => {
    setGuess(e.target.value)
  }

  useEffect(() => {
    setGuess(guess1 + guess2 + guess3 + guess4)
  }, [guess1,guess2,guess3,guess4])

  const submit = () => {
    if (answer === guess) {
      console.log('correct - game over :)');
    } else if (answer !== guess && guesses === limit) {
      console.log('too many attempts - game over :(')
    } else {
      setGuesses(guesses+1)
      // preserve current div, set an active div
    }
  }

  return (
    <div className="container gameContainer">
      <h3 className="title gameTitle">Game div</h3>
      <div className="inputs">
        {/* <input onChange={handleChange}></input> */}
        <Selector
          id={1}
          possibleAnswers={possibleAnswers}
          set={setGuess1}
        />
        <Selector
          id={2}
          possibleAnswers={possibleAnswers}
          set={setGuess2}
        />
        <Selector
          id={3}
          possibleAnswers={possibleAnswers}
          set={setGuess3}
        />
        <Selector
          id={4}
          possibleAnswers={possibleAnswers}
          set={setGuess4}
        />
        <button onClick={submit}>Submit guess</button>
      </div>
    </div>
  )
}

export default Game