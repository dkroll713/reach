import React from 'react';

import './_buttons.scss'

const Buttons = (props) => {
  const { toggle } = props;

  const handleChange = (e) => {
    console.log(e.target.name);
    toggle(e.target.name)
  }

  return (
    <div className="container buttons">
      <button name="1" onClick={handleChange}>Play Game</button>
      <button name="2" onClick={handleChange}>Select Difficulty</button>
      <button name="3" onClick={handleChange}>High Scores</button>
    </div>
  )
}

export default Buttons;