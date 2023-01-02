import React, { useState, useEffect, createContext } from "react"
const axios = require('axios');

import ThemeToggle from './ThemeToggle.jsx'

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
  const settings = {
    "feedback":1,
    "digits":8,
    "comboLength":4,
    "attempts":10
  }
  const [customSettings, setCustomSettings] = useState(settings)
  const [theme, setTheme] = useState(0)
  const [rootBG, setRootBG] = useState('#222222')
  const backgrounds = {
    0: "#222222",
    // 1:  "url('./digitalRain.jpg')"
    1: "url('https://j.gifs.com/Q1xW4q.gif')"
  }
  const body = document.body
  let canvas = document.getElementsByTagName('canvas')[0]
  if (theme == 0) {
    body.style.backgroundColor = backgrounds[0]
    if (canvas) canvas.style.display = 'none'
  } else if (theme == 1) {
    if (canvas) canvas.style.display = ''
  }

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
    <>
    <canvas id="canvas"></canvas>
    <div className="appRoot">
      <ThemeToggle
        theme={theme}
        setTheme={setTheme}
      />
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
          <div className="rootMid">
            <ActiveRules
              difficulties={difficulties}
              difficulty={difficulty}
              display={display}
              settings={customSettings}
            />
          </div>
          <div className="container rootBottom">
            <AnswerContext.Provider value={answer}>
              <Game
                settings={customSettings}
                setSettings={setCustomSettings}
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
          settings={customSettings}
          setSettings={setCustomSettings}
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
    </>
  )
}

export default AppRoot