import React from 'react';

const Standard = () => {

  return (
    <div className="difficulty">
      <h3 className="title rulesTitle">Standard</h3>
      <p>Four digit combos from 8 total digits, such as 0534, 7601, or 1432.</p>
      <p>Vague feedback:</p>
      <ul className="list">
        <li className="listItem">0 correct digits and 0 correct locations</li>
        <li className="listItem">3 correct digits and 1 correct locations</li>
      </ul>
      <p>Ten attempts.</p>
    </div>
  )
}

export default Standard;