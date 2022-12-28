import React, { useState, useEffect, createContext } from "react"
const axios = require('axios');

import Game from './Game.jsx'
import Rules from './Rules.jsx'
export const AnswerContext = createContext()

import './_app.scss'

const AppRoot = () => {
  const [answer, setAnswer] = useState('1234')
  const [ready,setReady] = useState(false);

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

  return (
    <div className="appRoot">
      <div className="container rootTop">
        <h1 className="title pageTitle">The Mastermind Game</h1>
      </div>
      <div className="container rootMid">
        <h3 className="title rulesTitle">Rules</h3>
        <Rules />
      </div>
      <div className="container rootBottom">
        <AnswerContext.Provider value={answer}>
          <Game setAnswer={setAnswer} />
        </AnswerContext.Provider>
      </div>
    </div>
  )
}

export default AppRoot