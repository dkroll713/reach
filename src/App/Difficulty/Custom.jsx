import React from 'react';

const Custom = () => {

  return (
    <div>
      <h3 className="title rulesTitle">Custom</h3>
      <p>The player can toggle individual settings, such as: </p>
      <ul className="list">
        <li className="listItem">
          precise or vague feedback
        </li>
        <li className="listItem">
          the number of possible digits
        </li>
        <li className="listItem">
          the length of possible combinations
        </li>
        <li className="listItem">
          and the number of attempts.
        </li>
      </ul>
    </div>
  )
}

export default Custom;