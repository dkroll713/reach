import React from 'react';

const ScoreItem = (props) => {
  const { score } = props;

  return (
    <li className="scoreItem">
      <h3>{score.name}</h3>
      <h3>{score.score}</h3>
    </li>
  )
}

export default ScoreItem