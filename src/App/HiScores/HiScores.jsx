import React from 'react';

import ScoreList from './ScoreList.jsx'
import './_scores.scss'

const HiScores = (props) => {
  const { difficulties } = props;
  delete difficulties[3];



  return (
    <div className="container scoreContainer rootBottom">
      {
        Object.keys(difficulties).map((difficulty,x) => {
          return (
            <div key={x} className="scores">
              <h3 className="scoreHeader">{difficulties[x]}</h3>
              <ScoreList
                difficulty={difficulties[x]}
              />
            </div>
          )
        })
      }
    </div>
  )
}

export default HiScores;