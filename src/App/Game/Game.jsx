import React, { useState, useEffect, useContext } from 'react';

const axios = require('axios');

import SelectorsCircle from './Circles/SelectorsCircle.jsx'
import SelectorCircle from './Circles/SelectorCircle.jsx'

import SelectorsMatrix from './Matrix/SelectorsMatrix.jsx'

import Selectors from './Selectors.jsx'
import Selector from './Selector.jsx'
import Feedbacks from './Feedbacks.jsx'
import Guess from './Guess.jsx'
import Correct from './Correct.jsx'
import { AnswerContext } from '../AppRoot.jsx'


const Game = (props) => {
  // const answer = useContext(AnswerContext)
  const {
    difficulty, difficulties, settings, theme, local
  } = props;

  const [answer, setAnswer] = useState()
  const [ready, setReady] = useState(false);
  const [guess, setGuess] = useState('0000');
  const [guesses, setGuesses] = useState(new Array(0).fill(0));
  const [feedbacks, setFeedbacks] = useState(new Array(0).fill(0));
  const [params, setParams] = useState({
    "feedback":Number(1),
    "digits":Number(8),
    "comboLength":Number(4),
    "attempts":Number(10)
  })
  const [correct, setCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [modalCount, setModalCount] = useState(0);
  const [activeModal, setActiveModal] = useState(null)

  // reset object - allows 'play again' button to flush the game board & set up a new game
  const reset = {};
  reset.guessFns = {};
  reset.guessFns.guess = setGuess;
  reset.guesses = setGuesses;
  reset.feedback = setFeedbacks;
  reset.correct = setCorrect;
  reset.gameOver = setGameOver;
  reset.answer = setAnswer;


  // based on selected difficulty, determines the parameters used by the game
  useEffect(() => {
    // console.log('difficulty:',difficulty)
    switch(difficulty) {
      case 0:
        setParams({
          "feedback":Number(0),
          "digits":Number(8),
          "comboLength":Number(4),
          "attempts":Number(10)
        })
        setReady(true);
        break
      case 1:
        setParams({
          "feedback":Number(1),
          "digits":Number(8),
          "comboLength":Number(4),
          "attempts":Number(10)
        });
        setReady(true);
        break
      case 2:
        setParams({
          "feedback":Number(1),
          "digits":Number(10),
          "comboLength":Number(6),
          "attempts":Number(10)
        });
        setReady(true);
        break
      case 3:
        setParams(settings);
        setReady(true);
        break;
    }
  }, [answer, difficulty, settings])


  // generates an answer and dummy guess of corresponding length
  useEffect(() => {
    generateAnswer();
  }, [ready])

  const generateAnswer = () => {
    if (ready) {
      // console.log(params)
      const length = params.comboLength
      // const max = params.digits > 1 ? params.digits-1 : params.digits;
      const max = params.digits-1;
      const intUrl = `https://www.random.org/integers/?num=${length}&min=0&max=${max}&col=1&base=10&format=plain&rnd=new`
      // console.log(intUrl)
      axios.get(intUrl)
        .then((res) => {
          let data = res.data;
          // console.log('beginning data:', data)
          if (data.length > 1) {
            data.length > 1 ? data = data.split('\n') : null
            data.length > 1 ? data.pop() : null
            data = data.length > 1 ? data.join('') : null
          }
          // console.log('answer length:', data)
          setAnswer(String(data))
          let dummy = new Array(length).fill(0)
          dummy = dummy.join('');
          setGuess(dummy)
        })
    }
  }

  // console.log('answer:', answer)

  // submits the guess and checks it against the answer
  const submit = () => {
    if (answer === guess) {
      setCorrect(true);
      let newGuesses = [...guesses]
      newGuesses.push(guess)
      setGuesses(newGuesses)
      let feedback = '';
      // console.log('params.feedback:',params.feedback)
      if (Number(params.feedback) == 0) {
        feedback = generateFeedbackEasy(answer, guess);
      } else {
        feedback = generateFeedbackStandard(answer, guess);
      }
      let newFeedbacks = [...feedbacks]
      newFeedbacks.push(feedback)
      setFeedbacks(newFeedbacks)
    } else {
      if (guesses.length === params.attempts-1) setGameOver(true);
      let newGuesses = [...guesses]
      newGuesses.push(guess)
      setGuesses(newGuesses)
      let feedback = '';
      // console.log('params.feedback:',params.feedback)
      if (Number(params.feedback) === 0) {
        feedback = generateFeedbackEasy(answer, guess);
      } else {
        feedback = generateFeedbackStandard(answer, guess);
      }
      let newFeedbacks = [...feedbacks]
      newFeedbacks.push(feedback)
      setFeedbacks(newFeedbacks)
      // console.log('feedback:',feedback)
    }
  }

  // generates feedback when params.feedback === 0
  const generateFeedbackEasy = (answer, guess) => {
    // console.log('generating easy feedback for',answer,'and',guess)
    let ogAnswer = answer;
    let ogGuess = guess;
    answer =  answer.length > 1 ? answer.split('') : [answer]
    guess = guess.length > 1 ? guess.split('') : [guess]
    let feedback = new Array(Number(params.comboLength)).fill('0');
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
    // console.log(answer, guess)
    return feedback.join('')
  }

  // generates feedback when params.feedback === 1
  const generateFeedbackStandard = (answer, guess) => {
    // console.log('generating standard feedback for',answer,'and',guess)
    let ogAnswer = answer;
    let ogGuess = guess;
    answer = answer.length > 1 ? answer.split('') : [answer]
    guess = guess.length > 1 ? guess.split('') : [guess]
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
    // console.log(answer, guess)
    // count correct places
    answer = ogAnswer.split('');
    guess = ogGuess.split('');
    // console.log('reset answer',answer,'reset guess',guess)
    let places = 0;
    guess.map((digit,x) => {
      if (answer[x] === digit) {
        places++;
      }
    })
    feedback = `${digits} correct numbers and ${places} correct locations`
    if (digits > 0)  {
      return feedback
    } else {
      return 'all incorrect'
    }
    return feedback
  }

  // on click, resets the game board
  const resetBoard = () => {
    let dummy = new Array(params.comboLength).fill(0)
    dummy = dummy.join();
    setGuess(dummy)
    setGuesses([])
    setFeedbacks([]);
    setCorrect(false);
    setGameOver(false);
    generateAnswer();
  }

  return (
    <div className="container gameContainer">
      <>
      <h3 className="title gameTitle">{params.attempts-guesses.length} guesses remaining</h3>
      <Feedbacks
        guesses={guesses}
        feedbacks={feedbacks}
        params={params}
        difficulty={difficulty}
        difficulties={difficulties}
        theme={theme}
      />
      <Correct
        answer={answer}
        guess={guess}
        correct={correct}
        reset={reset}
        guesses={guesses}
        difficulty={difficulty}
        difficulties={difficulties}
        theme={theme}
        params={params}
        local={local}
      />
      {
        !correct
        ?
        gameOver
        ?
        <button onClick={resetBoard}>Play Again</button>
        :
        <div className="inputs">
          <div className="selectors">
            {
              ready
              ?
              theme === 0
              ?
              <SelectorsCircle
                params={params}
                guessers={reset.guessFns}
                guess={guess}
                setGuess={setGuess}
                difficulty={difficulty}
                modalCount={modalCount}
                setModalCount={setModalCount}
                activeModal={activeModal}
                setActiveModal={setActiveModal}
              />
              :
              <SelectorsMatrix
                params={params}
                guessers={reset.guessFns}
                guess={guess}
                setGuess={setGuess}
                difficulty={difficulty}
                modalCount={modalCount}
                setModalCount={setModalCount}
                activeModal={activeModal}
                setActiveModal={setActiveModal}
              />
              :
              null
            }
          </div>
          <button onClick={submit}>Submit guess</button>
        </div>
        :
        null
      }
      </>
    </div>
  )
}

export default Game