import React, { useState, useEffect, useContext } from 'react';



const axios = require('axios');
import Selector from './Selector.jsx'
import Feedbacks from './Feedbacks.jsx'
import Guess from './Guess.jsx'
import Correct from './Correct.jsx'
import { AnswerContext } from './AppRoot.jsx'


const Game = (props) => {
  const answer = useContext(AnswerContext)
  const { setAnswer, difficulty, difficulties } = props;
  const [guess, setGuess] = useState('')
  const [guess1, setGuess1] = useState('0')
  const [guess2, setGuess2] = useState('0')
  const [guess3, setGuess3] = useState('0')
  const [guess4, setGuess4] = useState('0')
  const [guesses, setGuesses] = useState(new Array(0).fill(0));
  const [feedbacks, setFeedbacks] = useState(new Array(0).fill(0));
  const [limit, setLimit] = useState(10)
  const [correct, setCorrect] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [possibleAnswers,setPossibleAnswers] = useState(new Array(8).fill(0))

  const reset = {};
  reset.guessFns = {};
  reset.guessFns.guess = setGuess;
  reset.guessFns.one = setGuess1;
  reset.guessFns.two = setGuess2;
  reset.guessFns.three = setGuess3;
  reset.guessFns.four = setGuess4;
  reset.guesses = setGuesses;
  reset.feedback = setFeedbacks;
  reset.correct = setCorrect;
  reset.gameOver = setGameOver;
  reset.answer = setAnswer;

  const handleChange = (e) => {
    setGuess(e.target.value)
  }

  useEffect(() => {
    setGuess(guess1 + guess2 + guess3 + guess4)
  }, [guess1,guess2,guess3,guess4,guesses,feedbacks])

  const submit = () => {
    if (answer === guess) {
      setCorrect(true);
    } else {
      if (guesses.length === limit-1) setGameOver(true);
      let newGuesses = [...guesses]
      newGuesses.push(guess)
      setGuesses(newGuesses)
      let feedback = generateFeedback(answer, guess)
      let newFeedbacks = [...feedbacks]
      newFeedbacks.push(feedback)
      setFeedbacks(newFeedbacks)
      console.log('feedback:',feedback)
    }
  }

  const generateFeedback = (answer, guess) => {
    console.log('comparing',answer,'and',guess)
    let ogAnswer = answer;
    let ogGuess = guess;
    answer = answer.split('');
    guess = guess.split('');
    let feedback = '';
    // count correct digits
    let digits = 0;
    guess.map((digit) => {
      let locA = answer.indexOf(digit);
      if (locA > -1) {
        digits++;
        answer.splice(locA,1,'x');
      }
    })
    console.log(answer, guess)
    // count correct places
    answer = ogAnswer.split('');
    guess = ogGuess.split('');
    console.log('reset answer',answer,'reset guess',guess)
    let places = 0;
    guess.map((digit,x) => {
      if (answer[x] === digit) {
        places++;
      }
    })
    feedback = `${digits} correct digits and ${places} correct locations`
    return feedback
  }

  return (
    <div className="container gameContainer">
      <h3 className="title gameTitle">{limit-guesses.length} guesses remaining</h3>
      <Feedbacks
        guesses={guesses}
        feedbacks={feedbacks}
      />
      <Correct
        answer={answer}
        guess={guess}
        correct={correct}
        reset={reset}
        guesses={guesses}
        difficulty={difficulty}
        difficulties={difficulties}
      />
      {
        !correct
        ?
        gameOver ? null :
        <div className="inputs">
          {/* <input onChange={handleChange}></input> */}
          <div className="selectors">
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
          </div>
          <button onClick={submit}>Submit guess</button>
        </div>
        :
        null
      }
    </div>
  )
}

export default Game