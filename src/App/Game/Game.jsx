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

/*
  component responsible for rendering and administrating the entire "game"
    renders the correct Selectors component which allows player to choose either colors or symbols
      based on theme, renders color circles or matrix symbols
    renders the Feedbacks component which programatically displays guess history
      after each guess the history arrays are populated and a new feedback is shown
    renders the Correct component which allows the user to submit their score or play again
      component is hidden until 'correct' state is true
*/
const Game = (props) => {
  /*
    difficulty : integer = represents selected difficulty
    difficulties : object = key-value pairs of integers and difficulties, used in Correct component
    settings : object = custom settings
    theme : integer = determines color scheme
    userID : integer = user ID from database, used when submitting high scores in Correct
  */
  const {
    difficulty, difficulties, settings, theme, userID
  } = props;

  /*
    answer : string = string of numbers representing the game answer
    ready : boolean = flipped to true when the game is ready for an answer (settings have been confirmed)
    guess : string = string of numbers representing the player's guess
    guesses : array = history of guesses
    feedbacks : array = history of feedback
    params : object = settings used to intialize game - default is 'standard' difficulty
    correct : boolean = flipped to true when answer matches guess
    gameOver : boolean = flipped to true when there are no more guesses allowed, aka player loses
    modalCount : integer = number of selection modals open, prevents more than one at a time
    activeModal : null/integer = indicates which selector has a modal open, prevents more than one at a time
    canSubmit : boolean = determines whether player can submit a guess or not
    chosen : array = array of booleans - canSubmit is flipped to true when all booleans are true
  */
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
  const [canSubmit, setCanSubmit] = useState(false)
  const [chosen, setChosen] = useState(new Array(params.comboLength).fill(false))

  // reset object - allows 'play again' button to flush the game board & set up a new game
  const reset = {};
  reset.guessFns = {};
  reset.guessFns.guess = setGuess;
  reset.guesses = setGuesses;
  reset.feedback = setFeedbacks;
  reset.correct = setCorrect;
  reset.gameOver = setGameOver;
  reset.answer = setAnswer;
  reset.submit = setCanSubmit;
  reset.chosen = setChosen;


  /*
    every time the chosen array changes, check whether each index is true or false
    if all are true, player can guess
  */
  useEffect(() => {
    let valid = true;
    chosen.map((choice) => {
      if (choice === false) valid = false
    })
    if (valid) setCanSubmit(true);
  }, [chosen])

  /*
    based on selected difficulty, determines the parameters used by the game
    if selected difficulty is custom, uses the custom settings
  */
  useEffect(() => {
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


  // waits until game settings are finalized to generate answer with correct parameters
  useEffect(() => {
    generateAnswer();
  }, [ready])

  // generates an answer and dummy guess of corresponding length
  const generateAnswer = () => {
    if (ready) {
      const length = params.comboLength
      const max = params.digits-1;
      const intUrl = `https://www.random.org/integers/?num=${length}&min=0&max=${max}&col=1&base=10&format=plain&rnd=new`
      axios.get(intUrl)
        .then((res) => {
          let data = res.data;
          if (data.length > 1) {
            data.length > 1 ? data = data.split('\n') : null
            data.length > 1 ? data.pop() : null
            data = data.length > 1 ? data.join('') : null
          }
          setAnswer(String(data))
          let dummy = new Array(length).fill(0)
          dummy = dummy.join('');
          setGuess(dummy)
        })
    }
  }

  // submits the guess and checks it against the answer
  const submit = () => {
    if (answer === guess) {
      setCorrect(true);
      let newGuesses = [...guesses]
      newGuesses.push(guess)
      setGuesses(newGuesses)
      let feedback = '';
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
      if (Number(params.feedback) === 0) {
        feedback = generateFeedbackEasy(answer, guess);
      } else {
        feedback = generateFeedbackStandard(answer, guess);
      }
      let newFeedbacks = [...feedbacks]
      newFeedbacks.push(feedback)
      setFeedbacks(newFeedbacks)
    }
  }

  // generates feedback when params.feedback === 0
  const generateFeedbackEasy = (answer, guess) => {
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
    return feedback.join('')
  }

  // generates feedback when params.feedback === 1
  const generateFeedbackStandard = (answer, guess) => {
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
    // count correct places
    answer = ogAnswer.split('');
    guess = ogGuess.split('');
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
    setChosen(new Array(params.comboLength).fill(false))
    setCanSubmit(false)
  }

  // determines whether submit button is disabled or not and which theme to use
  let button;
  switch(theme) {
    case 0:
      canSubmit
      ?
      button = (
        <div>
        <button className='signInBtn' onClick={submit}>Submit guess</button>
        </div>
      )
      :
      button = (
        <div>
        <button disabled={true} className='signInBtn' onClick={submit}>Submit guess</button>
        </div>
      )
      break;
    case 1:
      canSubmit
      ?
      button = (
        <button className='btnMatrix' onClick={submit}>Submit guess</button>
      )
      :
      button = (
        <button disabled={true} className='btnMatrix' onClick={submit}>Submit guess</button>
      )
      break;
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
        theme={theme}
      />
      <Correct
        answer={answer}
        guess={guess}
        correct={correct}
        reset={reset}
        guesses={guesses}
        feedbacks={feedbacks}
        difficulty={difficulty}
        difficulties={difficulties}
        theme={theme}
        params={params}
        userID={userID}
      />
      {
        !correct
        ?
        gameOver
        ?
        theme === 0
        ?
        <>
          <div className="buttonHolder">
            <button className="signInBtn" onClick={resetBoard}>Play Again</button>
          </div>
        <div className="buffer"></div>
        </>
        :
        <>
          <div className="buttonHolder">
            <button className="btnMatrix" onClick={resetBoard}>Play Again</button>
          </div>
        <div className="buffer"></div>
        </>
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
                chosen={chosen}
                setChosen={setChosen}
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
                chosen={chosen}
                setChosen={setChosen}
              />
              :
              null
            }
          </div>
          {
            button
          }

        </div>
        :
        null
      }
      </>
    </div>
  )
}

export default Game