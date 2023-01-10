import React, { useState, useEffect, createContext } from "react"
import { useAuth0 } from '@auth0/auth0-react';
const axios = require('axios');

import Header from './DisplayState/Header.jsx'
import HowToPlay from './HowToPlay.jsx'
import Game from './Game/Game.jsx';
import HomeButton from './HomeButton.jsx';
import Buttons from './DisplayState/Buttons.jsx';
import Difficulty from './Difficulty/Difficulty.jsx';
import ActiveRules from './ActiveRules.jsx'
import HiScores from './HiScores/HiScores.jsx';

export const ConnectionContext = createContext()

import './_app.scss'

/*
  the 'root' of the app: doesn't directly govern the game logic, but influences it
    contains the Header bar where users can toggle the theme and sign in and out
    contains the HowToPlay section which shows a rules overview and informs about the app
    contains the Game component where the game logic lives
    contains the HiScores where the leaderboards live
*/
const AppRoot = () => {
  /*
    display : integer = determines which page of the app to show
    difficulties : object = key-value pairs tying difficulty integer to the name of the difficulty
    difficulty : integer = determines the default ruleset to use
      if 3, uses custom ruleset determined by player
    customSettings : object = the 'master' game setting object
      only used to govern game if player selects custom difficulty
    theme : integer = determines color scheme
    signedIn : boolean = determines if the player has signed in or not
    userID : null/integer = retrieved from database - used when submitting scores to database
    local : integer = determines whether to show local or cloud leaderboards
    connected : boolean = used in connection status
  */
  const [display, setDisplay] = useState(0)
  const difficulties = {
    0: "Easy",
    1: "Standard",
    2: "Hard",
    3: "Custom"
  }
  const [difficulty, setDifficulty] = useState(1);
  const [customSettings, setCustomSettings] = useState({
    "feedback": 1,
    "digits": 8,
    "comboLength": 4,
    "attempts": 10
  })
  const [theme, setTheme] = useState(0)
  const [signedIn, setSignedIn] = useState(false);
  const [userID, setUserID] = useState(null);
  const [local, setLocal] = useState(0);
  const [connected, setConnected] = useState(false);
  const { isAuthenticated, user } = useAuth0();

  const backgrounds = {
    0: "#002f47",
    1: "#000000"
  }

  // recursive function determines connection status based on server response
  const checkConnection = () => {
    axios.get('/ping')
      .then((res) => {
        setLocal(1)
        setConnected(true)
        setTimeout(checkConnection, 2500);
      })
      .catch((err) => {
        setLocal(0)
        setConnected(false)
        setTimeout(checkConnection, 2500)
      })
  }

  // empty dependancy array triggers a single invocation of checkConnection
  useEffect(() => {
    checkConnection()
  }, [])

  // if a user is signed in, retrieve their user ID from the database
  useEffect(() => {
    if (isAuthenticated) {
      setSignedIn(true)
      const queries = {
        "params": {
          "user": user.name
        }
      }
      axios.get(`/u/`, queries)
        .then((res) => {
          setUserID(res.data.user_id);
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      setSignedIn(false);
    }
  }, [isAuthenticated])

  // if the theme is 1, trigger the digital rain background
  useEffect(() => {
    const body = document.body
    let canvas = document.getElementsByTagName('canvas')[0]
    if (theme == 0) {
      if (canvas) canvas.style.display = 'none'
    } else if (theme == 1) {
      if (canvas) canvas.style.display = ''
    }
  }, [theme])



  // if there is no localStorage for local leaderboards, create one
  const createStorage = () => {
    if (!window.localStorage.scores) {
      let scoreObj = {};
      scoreObj.Easy = [];
      scoreObj.Standard = [];
      scoreObj.Hard = [];
      scoreObj = JSON.stringify(scoreObj);
      window.localStorage.setItem('scores', scoreObj);
    }
  }
  createStorage();

  // function to return to main display
  const returnHome = () => {
    setDisplay(0);
  }

  /*
    determines which 'meat' of the page to show:
      if display is 0, show the how to play component
      if display is 1, show the currently selected ruleset and the game
      if display is 2, show the difficulty selection screen
  */
  let mainDisplay;
  switch (display) {
    case 0:
      mainDisplay = (
        <div className="rootMid">
          <HowToPlay theme={theme} />
        </div>
      )
      break;
    case 1:
      mainDisplay = (
        <>
          <div className="rootMid">
            <ActiveRules
              difficulty={difficulty}
              display={display}
              settings={customSettings}
              theme={theme}
            />
          </div>
          <div className="container rootBottom">
            <Game
              settings={customSettings}
              setSettings={setCustomSettings}
              difficulty={difficulty}
              difficulties={difficulties}
              theme={theme}
              userID={userID}
            />
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
      <ConnectionContext.Provider value={connected}>
        <div className="appRoot" style={{ 'backgroundColor': backgrounds[theme] }}>
          <Header
            theme={theme}
            setTheme={setTheme}
            connected={connected}
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
                local={local}
                setLocal={setLocal}
                connected={connected}
              />
              :
              null
          }
        </div>
      </ConnectionContext.Provider>

    </>
  )
}

export default AppRoot