import React, { useState, useEffect } from 'react';

import ScoreList from './ScoreList.jsx';
import LocalToggle from './LocalToggle.jsx';
import Feedbacks from '../Game/Feedbacks.jsx';
import './_scores.scss';

const HiScores = (props) => {
  /*
    difficulties = used to parse difficulty for leaderboard section
    theme = used to determine theme
    local = used to determine connectivity
  */
  const { difficulties, theme, local } = props;
  // guesses, feedbacks, difficulty, difficulties, params, theme

  // selected = used to determine which score item will be expanded
  const [selected, setSelected] = useState(null);
  // removes custom difficulty from leaderboard object
  delete difficulties[3];

  let params = {
    "feedback": (selected && selected.difficulty) == 0 ? 0 : 1
  }

  console.log('params:', params);

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

  const hide = () => {
    setSelected(null);
  }

  return (
    <div
      className="container scoreContainer rootBottom"
      style={{
        'backgroundColor':backgrounds[theme],
        'border': '1px solid ' + borders[theme]
        }}
    >
      {
        selected
        ?
        <h3 className="scoreTitle">Click again to return to the scoreboard</h3>
        :
        <>
          <h3 className="scoreTitle">{key[local]} Leaderboards</h3>
          {
            local === 0
            ?
            null
            :
            <h4>Click on a score to see its history</h4>
          }
        </>
      }
      <div className="scoreboard">
      {
        selected
        ?
        <div className="detailedScore" onClick={hide}>
          <div className="flexed">
            <h3 className="detailedScoreTitle">
              Name: {selected.name}
            </h3>
            <h3>Difficulty: {difficulties[selected.difficulty]}</h3>
            <h3>Score: {selected.score}</h3>
          </div>
          <Feedbacks
            guesses={selected.guesses}
            feedbacks={selected.feedbacks}
            difficulty={selected.difficulty}
            difficulties={difficulties}
            params={params}
            theme={theme}
          />
        </div>
        :
        Object.keys(difficulties).map((difficulty,x) => {
          return (
            <div key={x} className="scores">
              <h3 className="scoreHeader">{difficulties[x]}</h3>
              <ScoreList
                local={local}
                difficulty={difficulties[x]}
                difficulties={difficulties}
                index={x}
                selected={selected}
                setSelected={setSelected}
                local={local}
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