import React from 'react';

const ScoreItem = (props) => {
  const { score, selected, setSelected, local } = props;
  let { rank } = props;
  rank = String(rank);

  const display = () => {
    score.rank = rank;
    setSelected(score)
    console.log('displaying score:',score);
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
  (
    <li className="scoreItem" onClick={display}>
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