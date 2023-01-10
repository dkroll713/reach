import React from 'react';

import './_buttons.scss'

/*
  responsible for the play game/change difficulty buttons, as well as the quit button
*/
const Buttons = (props) => {
  /*
    toggle : function = sets display === to input of function
    display : integer = determines which main page of the app is showing
    theme : integer = determines color scheme
  */
  const { toggle, display, theme } = props;

  // sets display to show whichever button is selected
  const handleChange = (e) => {
    toggle(Number(e.target.name));
  }

  return (
    <div className="buttons">
      {
        display != 3
          ?
          theme === 0
            ?
            <button
              name="1"
              className="sideButton"
              onClick={handleChange}
            >Play Game</button>
            :
            <button
              name="1"
              className="selectButton"
              onClick={handleChange}
            >
              Begin
            </button>
          :
          null
      }
      {
        theme === 0
          ?
          <button
            name="2"
            className="sideButton"
            onClick={handleChange}
          >Select Difficulty</button>
          :
          <button
            name="2"
            className="selectButton"
            onClick={handleChange}
          >
            Alter_params
          </button>
      }
    </div>
  )
}

export default Buttons;