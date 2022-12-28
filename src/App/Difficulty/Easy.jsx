import React from 'react';

const Easy = () => {

  return (
    <div className="rulesDiv">
      <h3 className="title rulesTitle">Easy</h3>
      <p>At the start of the game the computer will randomly select a pattern of four different numbers from a total of 8 different numbers such as 0534, 7601, or 1432.</p>
      <p> At the end of each attempt to guess the 4 number combination, the computer will provide feedback whether the player has guessed a number correctly, or/and a number and digit correctly.</p>
      <p>Possible feedback:</p>
      <ul className="list">
        <li className="listItem">0 correct digits and 0 correct locations</li>
        <li className="listItem">3 correct digits and 1 correct locations</li>
      </ul>
      <p>A player must guess the right number combination within 10 attempts to win the game.</p>
    </div>
  )
}

export default Easy;