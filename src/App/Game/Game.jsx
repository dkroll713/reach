import React, { useState, useEffect, useContext } from 'react';

const axios = require('axios');
import Selectors from './Selectors.jsx'
import Selector from './Selector.jsx'
import Feedbacks from './Feedbacks.jsx'
import Guess from './Guess.jsx'
import Correct from './Correct.jsx'
import { AnswerContext } from '../AppRoot.jsx'


const Game = (props) => {
  const answer = useContext(AnswerContext)
  const { setAnswer, difficulty, difficulties } = props;

  const [guess, setGuess] = useState('');
  const [guess1, setGuess1] = useState('0');
  const [guess2, setGuess2] = useState('0');
  const [guess3, setGuess3] = useState('0');
  const [guess4, setGuess4] = useState('0');
  const [guess5, setGuess5] = useState('0');
  const [guess6, setGuess6] = useState('0');
  const [guesses, setGuesses] = useState(new Array(0).fill(0));
  const [feedbacks, setFeedbacks] = useState(new Array(0).fill(0));
  const [limit, setLimit] = useState(10);
  const [correct, setCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const reset = {};
  reset.guessFns = {};
  reset.guessFns.guess = setGuess;
  reset.guessFns.one = setGuess1;
  reset.guessFns.two = setGuess2;
  reset.guessFns.three = setGuess3;
  reset.guessFns.four = setGuess4;
  reset.guessFns.five = setGuess5;
  reset.guessFns.six = setGuess6;
  reset.guesses = setGuesses;
  reset.feedback = setFeedbacks;
  reset.correct = setCorrect;
  reset.gameOver = setGameOver;
  reset.answer = setAnswer;

  const handleChange = (e) => {
    setGuess(e.target.value)
  }

  useEffect(() => {
    difficulty != 2
    ?
    setGuess(guess1 + guess2 + guess3 + guess4)
    :
    setGuess(guess1 + guess2 + guess3 + guess4 + guess5 + guess6)
  }, [guess1, guess2, guess3, guess4, guess5, guess6,guesses,feedbacks])

  const submit = () => {
    if (answer === guess) {
      setCorrect(true);
      let newGuesses = [...guesses]
      newGuesses.push(guess)
      setGuesses(newGuesses)
      let feedback = '';
      if (difficulty === '0') {
        feedback = generateFeedbackEasy(answer, guess);
      } else {
        feedback = generateFeedbackStandard(answer, guess);
      }
      let newFeedbacks = [...feedbacks]
      newFeedbacks.push(feedback)
      setFeedbacks(newFeedbacks)
    } else {
      if (guesses.length === limit-1) setGameOver(true);
      let newGuesses = [...guesses]
      newGuesses.push(guess)
      setGuesses(newGuesses)
      let feedback = '';
      if (difficulty === '0') {
        feedback = generateFeedbackEasy(answer, guess);
      } else {
        feedback = generateFeedbackStandard(answer, guess);
      }
      let newFeedbacks = [...feedbacks]
      newFeedbacks.push(feedback)
      setFeedbacks(newFeedbacks)
      console.log('feedback:',feedback)
    }
  }

  const generateFeedbackEasy = (answer, guess) => {
    console.log('generating easy feedback for',answer,'and',guess)
    let ogAnswer = answer;
    let ogGuess = guess;
    answer = answer.split('');
    guess = guess.split('');
    let feedback = new Array(4).fill('0');
    // create string consisting of 0,1,2
    guess.map((digit,x) => {
      let locA = answer.indexOf(digit);
      if (digit === answer[x]) {
        feedback[x] = '2'
        answer.splice(x,1,'x')
      }
    })
    guess.map((digit, x) => {
      let locA = answer.indexOf(digit);
      if (locA > -1 && feedback[x] === '0') {
        feedback[x] = '1';
        answer.splice(locA,1,'x')
      }
    })
    console.log(answer, guess)
    return feedback.join('')
  }

  const generateFeedbackStandard = (answer, guess) => {
    console.log('generating standard feedback for',answer,'and',guess)
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
        difficulty={difficulty}
        difficulties={difficulties}
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
          <div className="selectors">
            <Selectors
              guessers={reset.guessFns}
              difficulty={difficulty}
            />
            {/* <Selector
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
            {
              difficulty == 2
              ?
              <>
                <Selector
                  id={5}
                  possibleAnswers={possibleAnswers}
                  set={setGuess5}
                />
                <Selector
                  id={6}
                  possibleAnswers={possibleAnswers}
                  set={setGuess6}
                />
              </>
              :
              null
            } */}
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