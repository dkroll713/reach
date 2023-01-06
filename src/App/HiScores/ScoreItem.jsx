import React from 'react';


/*
  if not connected to server, show offline leaderboards with no click handler
  if connected to server, show online leaderboards in accordance with a theme
*/
const ScoreItem = (props) => {
  const {
    score, selected, setSelected, local, theme
  } = props;
  let { rank } = props;
  rank = String(rank);


  // displays an individual score's history
  const display = () => {
    score.rank = rank;
    setSelected(score)
  }

  return local === 0
  ?
  (
    <li className="scoreItem">
      {
        rank[rank.length-1] === '1'
          ?
          <h3>{rank}st</h3>
          :
          rank[rank.length-1] === '2'
            ?
            <h3>{rank}nd</h3>
            :
            rank[rank.length-1] === '3'
              ?
              <h3>{rank}rd</h3>
              :
              <h3>{rank}th</h3>
      }
      <h3>{score.name}</h3>
      <h3>{score.score}</h3>
    </li>
  )
  :
  theme === 0
  ?
  (
    <li className="scoreItem circ" onClick={display}>
      {
        rank[rank.length-1] === '1'
          ?
          <h3>{rank}st</h3>
          :
          rank[rank.length-1] === '2'
            ?
            <h3>{rank}nd</h3>
            :
            rank[rank.length-1] === '3'
              ?
              <h3>{rank}rd</h3>
              :
              <h3>{rank}th</h3>
      }
      <h3>{score.name}</h3>
      <h3>{score.score}</h3>
    </li>
  )
  :
  (
    <li className="scoreItem matr" onClick={display}>
      {
        rank[rank.length-1] === '1'
          ?
          <h3>{rank}st</h3>
          :
          rank[rank.length-1] === '2'
            ?
            <h3>{rank}nd</h3>
            :
            rank[rank.length-1] === '3'
              ?
              <h3>{rank}rd</h3>
              :
              <h3>{rank}th</h3>
      }
      <h3>{score.name}</h3>
      <h3>{score.score}</h3>
    </li>
  )
}

export default ScoreItem