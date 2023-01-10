import React from 'react';


/*
  renders the rules for hard mode
*/
const Hard = (props) => {
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
        'backgroundColor':backgrounds[theme],
        'border': '1px solid ' + borders[theme]
        }}>
      <div className="text">
        <h3 className="title rulesTitle">Hard</h3>
        <p>Six digit combos from 10 total digits, such as 053498, 796011, or 143286.</p>
        <p>Vague feedback:</p>
        <ul className="list">
          <li className="listItem">0 correct digits and 0 correct locations</li>
          <li className="listItem">3 correct digits and 1 correct locations</li>
        </ul>
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

export default Hard;