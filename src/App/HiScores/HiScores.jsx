import React from 'react';

import ScoreList from './ScoreList.jsx'
import './_scores.scss'

const HiScores = (props) => {
  const { difficulties, theme } = props;
  delete difficulties[3];

  const backgrounds = {
    0: "#32586b",
    1: "#0D0208"
  }

  const borders = {
    0: "#000000",
    1: "#00FF41"
  }

  return (
    <div
      className="container scoreContainer rootBottom"
      style={{
        'backgroundColor':backgrounds[theme],
        'border': '1px solid ' + borders[theme]
        }}
    >
        <h3 className="scoreTitle">Leaderboards</h3>
      <div className="scoreboard">
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
    </div>
  )
}

export default HiScores;