import React from 'react';

import './_buttons.scss'

const Buttons = (props) => {
  const { toggle } = props;

  const handleChange = (e) => {
    toggle(e.target.name)
  }

  return (
    <div className="buttons">
      <button
        name="1"
        className="sideButton"
        onClick={handleChange}
      >Play Game</button>
      <button
        name="2"
        className="sideButton"
        onClick={handleChange}
      >Select Difficulty</button>
    </div>
  )
}

export default Buttons;