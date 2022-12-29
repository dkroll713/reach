import React, { useState, useEffect, createContext } from "react"
const axios = require('axios');

import Game from './Game/Game.jsx';
import CustomGame from './Game/Custom/CustomGame.jsx'
import HomeButton from './HomeButton.jsx';
import Buttons from './DisplayState/Buttons.jsx';
import Difficulty from './Difficulty/Difficulty.jsx';

import ActiveRules from './ActiveRules.jsx'

import HiScores from './HiScores/HiScores.jsx';
import Rules from './Game/Rules.jsx';
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

  if (!ready) {
    const digits = difficulty === '2' ? '6' : '4'
    const max = difficulty === '2' ? '9' : '7'
    const intUrl = `https://www.random.org/integers/?num=${digits}&min=0&max=${max}&col=1&base=10&format=plain&rnd=new`
    axios.get(intUrl)
      .then((res) => {
        let data = res.data;
        data = data.split('\n')
        difficulty !== '2'
          ?
          data = data.splice(0,4).join('')
          :
          data = data.splice(0,6).join('');
        setAnswer(data)
        setReady(true);
      })
  }

  const createStorage = () => {
    if (!window.localStorage.scores) {
      let scoreObj = {};
      scoreObj.Easy = [];
      scoreObj.Standard = [];
      scoreObj.Hard = [];
      scoreObj = JSON.stringify(scoreObj);
      window.localStorage.setItem('scores',scoreObj);
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
        <div className="lower">
          <div className="lowerLeft">
            <h3 className="lowerTitleUpper">Selected difficulty:</h3>
            <h2 className="lowerTitleLower">{difficulties[difficulty]}</h2>
          </div>
          <div className="lowerRight">
          {
            display != 0
            ?
            <HomeButton
              display={display}
              toggle={setDisplay}
              returnHome={returnHome}
            />
            :
            <Buttons
              toggle={setDisplay}
            />
          }
          </div>
        </div>
      </div>
      {
        display == 0
        ?
        null
        :
        display == 1
        ?
        <>
          <div className="container rootMid">
            <ActiveRules
              difficulties={difficulties}
              difficulty={difficulty}
            />
          </div>
          <div className="container rootBottom">
            <AnswerContext.Provider value={answer}>
              <Game
                setAnswer={setAnswer}
                difficulty={difficulty}
                difficulties={difficulties}
              />
            </AnswerContext.Provider>
          </div>
        </>
        :
        display == 2
        ?
        <Difficulty
          toggle={setDisplay}
          difficulty={setDifficulty}
          ready={setReady}
          home={returnHome}
        />
        :
        display == 3
        ?
        <CustomGame
          difficulties={difficulties}
          difficulty={difficulty}
        />
        :
        null
      }
      {
        display == 0
        ?
        <HiScores
          difficulties={difficulties}
        />
        :
        null
      }
    </div>
  )
}

export default AppRoot