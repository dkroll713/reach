import React from 'react';

const Easy = () => {

  return (
    <div className="difficulty">
      <div className="text">
        <h3 className="title rulesTitle">Easy</h3>
        <p>Four digit combos from 8 total digits, such as 0534, 7601, or 1432.</p>
        <p>Precise feedback:</p>
        <div className="circlesList">
          <div className="circle one"></div>
          <div className="circle zero"></div>
          <div className="circle zero"></div>
          <div className="circle one"></div>
        </div>
        <div className="circlesList">
          <div className="circle two"></div>
          <div className="circle one"></div>
          <div className="circle one"></div>
          <div className="circle zero"></div>
        </div>
        <p>Ten attempts.</p>
      </div>
    </div>
  )
}

export default Easy;