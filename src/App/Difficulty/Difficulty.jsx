import React from 'react';

import Easy from './Easy.jsx';
import Standard from './Standard.jsx';
import Hard from './Hard.jsx';
import Custom from './Custom.jsx'

import './_difficulty.scss'

const Difficulty = (props) => {
  const { toggle, home, difficulty } = props;

  const selectDifficulty = (e) => {
    difficulty(e.target.name);
    toggle(0)
  }

  return (
    <div className="container rootMid">
      <div className="difficulties">
        <div className="difficulty">
          <Easy />
          <button
            name="0"
            onClick={selectDifficulty}
          >Select</button>
        </div>
        <div className="difficulty">
          <Standard />
          <button
            name="1"
            onClick={selectDifficulty}
          >Select</button>
        </div>
        <div className="difficulty">
          <Hard />
          <button
            name="2"
            onClick={selectDifficulty}
          >Select</button>
        </div>
        <div className="difficulty">
          <Custom />
          <button
            name="3"
            onClick={selectDifficulty}
          >Select</button>
        </div>
      </div>
    </div>
  )
}

export default Difficulty;