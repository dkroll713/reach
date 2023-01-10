import React from 'react';


/*
  renders the rules for easy mode
*/
const Easy = (props) => {
  const { theme, display } = props;
  const backgrounds = {
    0: "#32586b",
    1: "#0D0208"
  }
  const borders = {
    0: "#000000",
    1: "#00FF41"
  }

  return (
    <div
      className="difficulty"
      style={{
        'backgroundColor': backgrounds[theme],
        'border': '1px solid ' + borders[theme]
      }}>
      <div className="text">
        <h3 className="title rulesTitle">Easy</h3>
        <p>Four digit combos from 8 total digits, such as 0534, 7601, or 1432.</p>
        <p>Precise feedback:</p>
        <p>A green circle means that digit was guessed correctly. A yellow circle means the digit is in the wrong place. A red circle means the digit is incorrect.</p>
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
        {
          display === 1
            ?
            <p>To start playing, click on an empty circle (circles theme) or square(matrix theme).</p>
            :
            null
        }
      </div>
    </div>
  )
}

export default Easy;