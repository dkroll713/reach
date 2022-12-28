import React from 'react';

const Easy = () => {

  return (
    <div>
      <h3 className="title rulesTitle">Easy</h3>
      <p>At the start of the game the computer will randomly select a pattern of four different numbers from a total of 8 different numbers such as 0534, 7601, or 1432.</p>
      <p> At the end of each attempt to guess the combination, the computer will provide feedback showing the status of each digit.</p>
      <p>Possible feedback:</p>
      <div className="circles list">
        <div className="circle one"></div>
        <div className="circle zero"></div>
        <div className="circle zero"></div>
        <div className="circle one"></div>
      </div>
      <div className="circles list">
        <div className="circle two"></div>
        <div className="circle one"></div>
        <div className="circle one"></div>
        <div className="circle zero"></div>
      </div>
      <p>A player must guess the right number combination within 10 attempts to win the game.</p>
    </div>
  )
}

export default Easy;