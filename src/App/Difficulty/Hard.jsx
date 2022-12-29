import React from 'react';

const Hard = () => {

  return (
    <div>
      <h3 className="title rulesTitle">Hard</h3>
      <p>Six digit combos from 10 total digits, such as 053498, 796011, or 143286.</p>
      <p>Vague feedback:</p>
      <ul className="list">
        <li className="listItem">0 correct digits and 0 correct locations</li>
        <li className="listItem">3 correct digits and 1 correct locations</li>
      </ul>
      <p>Ten attempts.</p>
    </div>
  )
}

export default Hard;