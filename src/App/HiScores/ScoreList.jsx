import React, { useState, useEffect } from 'react';

const axios = require('axios')

import ScoreItem from './ScoreItem.jsx'

const ScoreList = (props) => {
  /*
    difficulty = used to grab scores for x difficulty
    local = used to determine server connectivity
    index = used to determine difficulty parameter for get request
    selected = used to display expanded score item
    setSelected = used to select the expanded score item
  */
  const { difficulty, local, index, selected, setSelected } = props;

  // array containing scores for scoreboard
  const [cloudScores, setCloudScores] = useState([])

  /*
    grab local scoreboard in case it's needed
  */
  let localScores = window.localStorage.getItem('scores')
  localScores = JSON.parse(localScores)[difficulty]


  /*
    if the server is reachable, send an axios request with difficulty as a parameter
    populate the scoreboard array with the response
  */
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

  /*
    if local === 0 render local scoreboard
    if local === 1 render cloud scoreboard
  */
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
                selected={selected}
                setSelected={setSelected}
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