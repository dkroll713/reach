import React from 'react';

import Easy from './Easy.jsx';
import Standard from './Standard.jsx';
import Hard from './Hard.jsx';
import Custom from './Custom.jsx'

import './_difficulty.scss'

const Difficulty = (props) => {
  const { toggle, home, difficulty, ready } = props;

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
        <div className="difficulty">
          <Easy />
          <button
            name="0"
            className="homeButton"
            onClick={selectDifficulty}
          >Select</button>
        </div>
        <div className="difficulty">
          <Standard />
          <button
            name="1"
            className="homeButton"
            onClick={selectDifficulty}
          >Select</button>
        </div>
        <div className="difficulty">
          <Hard />
          <button
            name="2"
            className="homeButton"
            onClick={selectDifficulty}
          >Select</button>
        </div>
        <div className="difficulty">
          <Custom />
          <button
            name="3"
            className="homeButton"
            onClick={selectCustom}
          >Select</button>
        </div>
      </div>
    </div>
  )
}

export default Difficulty;