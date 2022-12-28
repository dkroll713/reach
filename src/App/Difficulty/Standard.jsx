import React from 'react';

const Standard = () => {

  return (
    <div>
      <h3 className="title rulesTitle">Standard</h3>
      <p>Four digit combos from 8 total digits, such as 0534, 7601, or 1432.</p>
      <p>Vague feedback:</p>
      <ul className="list">
        <li className="listItem">0 correct digits and 0 correct locations</li>
        <li className="listItem">3 correct digits and 1 correct locations</li>
      </ul>
      <p>A player must guess the right number combination within 10 attempts to win the game.</p>
    </div>
  )
}

export default Standard;