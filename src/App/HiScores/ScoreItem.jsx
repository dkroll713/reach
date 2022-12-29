import React from 'react';

const ScoreItem = (props) => {
  const { score } = props;
  let { rank } = props;
  rank = String(rank);

  const inTens = (numString) => {
    if (numString.length === 2) {
      console.log('in tens')
      return true
    }
    return false
  }

  inTens(rank)

  return (
    <li className="scoreItem">
      {
        rank[rank.length-1] === '1' && !inTens(rank)
          ?
          <h3>{rank}st</h3>
          :
          rank[rank.length-1] === '2' && !inTens(rank)
            ?
            <h3>{rank}nd</h3>
            :
            rank[rank.length-1] === '3' && !inTens(rank)
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