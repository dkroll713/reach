import React from 'react';

import ScoreItem from './ScoreItem.jsx'

const ScoreList = (props) => {
  const { difficulty } = props;
  let scores = window.localStorage.getItem('scores')
  scores = JSON.parse(scores)[difficulty]

  return (
    <div className="scoreList">
      <ol>
        {
          scores.length > 0
          ?
          scores.map((score,x) => {
            return (
              <ScoreItem
                key={x}
                score={score}
                rank={x+1}
              />
            )
          })
          :
          <li>empty</li>
        }
      </ol>
    </div>
  )
}

export default ScoreList;