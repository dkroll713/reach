import React, { useState, useEffect, createContext } from "react"
const axios = require('axios');

import Game from './Game.jsx'
import Rules from './Rules.jsx'
export const AnswerContext = createContext()

import './_app.scss'

const AppRoot = () => {
  const [answer, setAnswer] = useState('1234')
  const [ready, setReady] = useState(false);
  const [display, setDisplay] = useState(0)

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

  return (
    <div className="appRoot">
      <div className="container rootTop">
        <h1 className="title pageTitle">The Mastermind Game</h1>
      </div>
      {
        display === 0
        ?
        <div className="container rootMid">Buttons</div>
        :
        display === 1
        ?
        <>
        <div className="container rootMid">
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
        display === 2
        ?
        <div>Difficulty Selection</div>
        : display === 3
        ?
        <div>Hi scores</div>
        :
        null
      }
    </div>
  )
}

export default AppRoot