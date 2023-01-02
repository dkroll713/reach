import React from 'react';

import Easy from './Easy.jsx';
import Standard from './Standard.jsx';
import Hard from './Hard.jsx';
import Custom from './Custom.jsx'

import './_difficulty.scss'

const Difficulty = (props) => {
  const { toggle, home, difficulty, ready, settings, setSettings } = props;

  const selectDifficulty = (e) => {
    difficulty(e.target.name);
    ready(false);
    toggle(0)
  }

  const selectCustom = (e) => {
    difficulty(e.target.name);
    ready(false);
    toggle(3)
  }

  return (
    <div className="container rootMid">
      <div className="difficulties">
        <div className="row">
          <div className="opt">
            <Easy />
            <button
              name="0"
              className="homeButton"
              onClick={selectDifficulty}
            >Select</button>
          </div>
          <div className="opt">
            <Standard />
            <button
              name="1"
              className="homeButton"
              onClick={selectDifficulty}
            >Select</button>
          </div>
        </div>
        <div className="row">
          <div className="opt">
            <Hard />
            <button
              name="2"
              className="homeButton"
              onClick={selectDifficulty}
            >Select</button>
          </div>
          <div className="opt">
            <Custom
              settings={settings}
              setSettings={setSettings}
            />
            <button
              name="3"
              className="homeButton"
              onClick={selectDifficulty}
            >Select</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Difficulty;