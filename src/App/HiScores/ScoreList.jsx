import React, { useState, useEffect } from 'react';

const axios = require('axios')

import ScoreItem from './ScoreItem.jsx'

const ScoreList = (props) => {
  const { difficulty, difficulties, local, index } = props;
  const [cloudScores, setCloudScores] = useState([])

  let localScores = window.localStorage.getItem('scores')
  localScores = JSON.parse(localScores)[difficulty]

  useEffect(() =>{
    if (local === 1) {
      const queries = {
        "params": {
          "difficulty":index
        }
      }
      axios.get('/scores', queries)
        .then((res) => {
          setCloudScores(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [local])

  let scoreboard
  switch(local) {
    case 0:
      scoreboard = (
        localScores.length > 0
          ?
          localScores.map((score,x) => {
            return (
              <ScoreItem
                local={local}
                key={x}
                score={score}
                rank={x+1}
              />
            )
          })
          :
          <li>empty</li>
      )
      break;
    case 1:
      scoreboard = (
        cloudScores.length > 0
          ?
          cloudScores.map((score, x) => {
            return (
              <ScoreItem
                local={local}
                key={x}
                score={score}
                rank={x+1}
              />
            )
          })
        :
        <li>cloud empty</li>
      )
      break;
  }

  return (
    <div className="scoreList">
      <ol>
        {
          scoreboard
        }
      </ol>
    </div>
  )
}

export default ScoreList;