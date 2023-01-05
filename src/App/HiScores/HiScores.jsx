import React, { useState } from 'react';

import ScoreList from './ScoreList.jsx'
import LocalToggle from './LocalToggle.jsx'
import './_scores.scss'

const HiScores = (props) => {
  const { difficulties, theme, local, setLocal } = props;
  delete difficulties[3];

  const backgrounds = {
    0: "#32586b",
    1: "#0D0208"
  }

  const borders = {
    0: "#000000",
    1: "#00FF41"
  }

  const key = {
    0:'Local',
    1:'Cloud'
  }

  console.log('displaying',key[local],'data')

  return (
    <div
      className="container scoreContainer rootBottom"
      style={{
        'backgroundColor':backgrounds[theme],
        'border': '1px solid ' + borders[theme]
        }}
    >
        <LocalToggle
          theme={theme}
          local={local}
          setLocal={setLocal}
        />
        <h3 className="scoreTitle">{key[local]} Leaderboards</h3>
      <div className="scoreboard">
      {
        Object.keys(difficulties).map((difficulty,x) => {
          return (
            <div key={x} className="scores">
              <h3 className="scoreHeader">{difficulties[x]}</h3>
              <ScoreList
                local={local}
                difficulty={difficulties[x]}
                difficulties={difficulties}
                index={x}
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