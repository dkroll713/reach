import React, { useState, useEffect, createContext } from "react"
const axios = require('axios');

import Game from './Game.jsx'
import Buttons from './DisplayState/Buttons.jsx'
import Difficulty from './Difficulty/Difficulty.jsx'
import Rules from './Rules.jsx'
export const AnswerContext = createContext()

import './_app.scss'

const AppRoot = () => {
  const [answer, setAnswer] = useState('1234')
  const [ready, setReady] = useState(false);
  const [display, setDisplay] = useState(0)
  const difficulties = {
    0:"Easy",
    1:"Standard",
    2:"Hard",
    3:"Custom"
  }
  const [difficulty, setDifficulty] = useState(1);

  const intUrl = 'https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new'
  if (!ready) {
    axios.get(intUrl)
      .then((res) => {
        let data = res.data;
        data = data.split('\n').splice(0,4).join('')
        setAnswer(data)
        setReady(true);
      })
  }

  const createStorage = () => {
    if (!window.localStorage.scores) {
      window.localStorage.setItem('scores',JSON.stringify([]));
    }
  }

  createStorage();

  const returnHome = () => {
    setDisplay(0);
  }

  return (
    <div className="appRoot">
      <div className="container rootTop">
        <h1 className="title pageTitle">The Mastermind Game</h1>
        <h3>Selected difficulty: {difficulties[difficulty]}</h3>
      </div>
      {
        display == 0
        ?
        <Buttons
          toggle={setDisplay}
        />
        :
        display == 1
        ?
        <>
          <div className="container rootMid">
            <button onClick={returnHome}>Go Back</button>
            <h3 className="title rulesTitle">Rules</h3>
            <Rules />
          </div>
          <div className="container rootBottom">
            <AnswerContext.Provider value={answer}>
              <Game setAnswer={setAnswer} />
            </AnswerContext.Provider>
          </div>
        </>
        :
        display == 2
        ?
        <Difficulty
          toggle={setDisplay}
          difficulty={setDifficulty}
          home={returnHome}
        />
        :
        display == 3
        ?
        <div>Hi scores</div>
        :
        null
      }
    </div>
  )
}

export default AppRoot