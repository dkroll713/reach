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
    hasAnswer, setHasAnswer, difficulty, difficulties, settings, theme
  } = props;
  // const { difficulty, difficulties, settings } = props;

  const [answer, setAnswer] = useState()
  const [ready, setReady] = useState(false);
  const [guess, setGuess] = useState('0000');
  // const [guess1, setGuess1] = useState('0');
  // const [guess2, setGuess2] = useState('0');
  // const [guess3, setGuess3] = useState('0');
  // const [guess4, setGuess4] = useState('0');
  // const [guess5, setGuess5] = useState('0');
  // const [guess6, setGuess6] = useState('0');
  const [guesses, setGuesses] = useState(new Array(0).fill(0));
  const [feedbacks, setFeedbacks] = useState(new Array(0).fill(0));
  const [params, setParams] = useState({
    "feedback":Number(1),
    "digits":Number(8),
    "comboLength":Number(4),
    "attempts":Number(10)
  })
  // const [params, setParams] = useState(settings);
  const [limit, setLimit] = useState(10);
  const [correct, setCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [modalCount, setModalCount] = useState(0);
  const [activeModal, setActiveModal] = useState(null)

  const reset = {};
  reset.guessFns = {};
  reset.guessFns.guess = setGuess;
  // reset.guessFns.one = setGuess1;
  // reset.guessFns.two = setGuess2;
  // reset.guessFns.three = setGuess3;
  // reset.guessFns.four = setGuess4;
  // reset.guessFns.five = setGuess5;
  // reset.guessFns.six = setGuess6;
  reset.guesses = setGuesses;
  reset.feedback = setFeedbacks;
  reset.correct = setCorrect;
  reset.gameOver = setGameOver;
  reset.answer = setAnswer;

  useEffect(() => {
    console.log('difficulty:',difficulty)
    difficulty == 0
      ?
      (setParams({
        "feedback":Number(0),
        "digits":Number(8),
        "comboLength":Number(4),
        "attempts":Number(10)
      }),
      setReady(true))
      :
        difficulty == 1
        ?
        (setParams({
          "feedback":Number(1),
          "digits":Number(8),
          "comboLength":Number(4),
          "attempts":Number(10)
        }),
        setReady(true))
        :
          difficulty == 2
            ?
            (setParams({
              "feedback":Number(1),
              "digits":Number(10),
              "comboLength":Number(6),
              "attempts":Number(10)
            }),
            setReady(true))
            :
              difficulty == 3
                ?
                (setParams(settings),
                setReady(true))
                :
                null
  }, [answer, difficulty, settings])

  // const generateAnswer = () => {
    useEffect(() => {
    if (ready) {
      console.log(params)
      const length = params.comboLength
      // const max = params.digits > 1 ? params.digits-1 : params.digits;
      const max = params.digits-1;
      const intUrl = `https://www.random.org/integers/?num=${length}&min=0&max=${max}&col=1&base=10&format=plain&rnd=new`
      console.log(intUrl)
      axios.get(intUrl)
        .then((res) => {
          let data = res.data;
          console.log('beginning data:', data)
          if (data.length > 1) {
            data.length > 1 ? data = data.split('\n') : null
            data.length > 1 ? data.pop() : null
            data = data.length > 1 ? data.join('') : null
          }
          console.log('answer length:', data)
          // if (data.length == length) {
            setAnswer(String(data))
            let dummy = new Array(length).fill(0)
            dummy = dummy.join('');
            setGuess(dummy)
          // }

          // setReady(true);
          // setHasAnswer(true)
        })
    }
  }, [ready])
  // }

  console.log('answer:', answer)

  const handleChange = (e) => {
    setGuess(e.target.value)
  }



  const submit = () => {
    if (answer === guess) {
      setCorrect(true);
      let newGuesses = [...guesses]
      newGuesses.push(guess)
      setGuesses(newGuesses)
      let feedback = '';
      console.log('params.feedback:',params.feedback)
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
      console.log('params.feedback:',params.feedback)
      if (Number(params.feedback) === 0) {
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
      {
        !ready
        ?
        <div className="centered">
          {/* {
            theme === 0
              ?
              <button onClick={generateAnswer} className="homeButton">Generate Answer</button>
              :
              <button onClick={generateAnswer} className="isolatePassword">Isolate_password</button>
          } */}
        </div>
        :
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
        />
        {
          !correct
          ?
          gameOver ? null :
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
      }


    </div>
  )
}

export default Game