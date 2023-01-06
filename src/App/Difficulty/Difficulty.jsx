import React from 'react';

import Easy from './Easy.jsx';
import Standard from './Standard.jsx';
import Hard from './Hard.jsx';
import Custom from './Custom.jsx'

import './_difficulty.scss'

/*
  renders the various difficulties and allows the player to select one.
  once a difficulty is selected, returns to the root of the app
*/
const Difficulty = (props) => {

  /*
    toggle : function = sets display property to be the input
    difficulty : integer = determines which settings object the app uses
    settings : object = used in custom component to toggle individual settings
    setSettings : function = sets the global settings object equal to customized settings object
    theme : integer = determines theme
  */
  const {
    toggle, difficulty, settings, setSettings, theme
  } = props;


  // sets difficulty to whichever is selected and returns to the app root
  const selectDifficulty = (e) => {
    difficulty(Number(e.target.name));
    toggle(0)
  }

  return (
    <div className="container rootMid">
      <div className="difficulties">
        <div className="row">
          <div className="opt">
            <Easy theme={theme} />
            {
              theme === 0
                ?
                <button
                  name="0"
                  className="homeButton"
                  onClick={selectDifficulty}
                >Select</button>
                :
                <button
                  name="0"
                  className="selectButton"
                  onClick={selectDifficulty}
                >Select</button>
            }
          </div>
          <div className="opt">
            <Standard theme={theme} />
            {
              theme === 0
                ?
                <button
                  name="1"
                  className="homeButton"
                  onClick={selectDifficulty}
                >Select</button>
                :
                <button
                  name="1"
                  className="selectButton"
                  onClick={selectDifficulty}
                >Select</button>
            }
          </div>
        </div>
        <div className="row">
          <div className="opt">
            <Hard theme={theme}/>
            {
              theme === 0
                ?
                <button
                  name="2"
                  className="homeButton"
                  onClick={selectDifficulty}
                >Select</button>
                :
                <button
                  name="2"
                  className="selectButton"
                  onClick={selectDifficulty}
                >Select</button>
            }
          </div>
          <div className="opt">
            <Custom
              settings={settings}
              setSettings={setSettings}
              theme={theme}
            />
            {
              theme === 0
                ?
                <button
                  name="3"
                  className="homeButton"
                  onClick={selectDifficulty}
                >Select</button>
                :
                <button
                  name="3"
                  className="selectButton"
                  onClick={selectDifficulty}
                >Select</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Difficulty;