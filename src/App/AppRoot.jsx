import React, { useState, useEffect, createContext } from "react"
const axios = require('axios');

import ThemeToggle from './ThemeToggle.jsx'
import HowToPlay from './HowToPlay.jsx'
import Game from './Game/Game.jsx';
import HomeButton from './HomeButton.jsx';
import Buttons from './DisplayState/Buttons.jsx';
import Difficulty from './Difficulty/Difficulty.jsx';
import ActiveRules from './ActiveRules.jsx'
import HiScores from './HiScores/HiScores.jsx';
import Rules from './Game/Rules.jsx';
export const AnswerContext = createContext()

import './_app.scss'

const AppRoot = () => {
  const [display, setDisplay] = useState(0)
  const difficulties = {
    0:"Easy",
    1:"Standard",
    2:"Hard",
    3:"Custom"
  }
  const [difficulty, setDifficulty] = useState(1);
  const [customSettings, setCustomSettings] = useState({
    "feedback":1,
    "digits":8,
    "comboLength":4,
    "attempts":10
  })
  const [theme, setTheme] = useState(0)

  const backgrounds = {
    0: "#002f47",
    1: "#000000"
  }

  useEffect(() => {
    const body = document.body
    let canvas = document.getElementsByTagName('canvas')[0]
    if (theme == 0) {
      if (canvas) canvas.style.display = 'none'
    } else if (theme == 1) {
      if (canvas) canvas.style.display = ''
    }
  }, [theme])


  console.log('difficulty:', difficulties[difficulty])

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

  let mainDisplay;
  switch(display) {
    case 0:
      mainDisplay = (
        <div className="rootMid">
          <HowToPlay theme={theme}/>
        </div>
      )
      break;
    case 1:
      mainDisplay = (
        <>
          <div className="rootMid">
            <ActiveRules
              difficulties={difficulties}
              difficulty={difficulty}
              display={display}
              settings={customSettings}
              theme={theme}
            />
          </div>
          <div className="container rootBottom">
            {/* <AnswerContext.Provider value={answer}> */}
              <Game
                settings={customSettings}
                setSettings={setCustomSettings}
                difficulty={difficulty}
                difficulties={difficulties}
                theme={theme}
              />
            {/* </AnswerContext.Provider> */}
          </div>
        </>
      )
      break;
    case 2:
      mainDisplay = (
        <Difficulty
          toggle={setDisplay}
          difficulty={setDifficulty}
          home={returnHome}
          settings={customSettings}
          setSettings={setCustomSettings}
          theme={theme}
        />
      )
      break;
  }

  return (
    <>
    <canvas id="canvas"></canvas>
    <div className="appRoot" style={{'backgroundColor':backgrounds[theme]}}>
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
              theme={theme}
            />
            :
            <Buttons
              toggle={setDisplay}
              theme={theme}
            />
          }
          </div>
        </div>
      </div>
      {
        mainDisplay
      }
      {
        display == 0
        ?
        <HiScores
          difficulties={difficulties}
          theme={theme}
        />
        :
        null
      }
    </div>
    </>
  )
}

export default AppRoot