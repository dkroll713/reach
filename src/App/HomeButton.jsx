import React from 'react';

/*
  determines what buttons at the top of the page should display
    if display is 0, show main page and let user either start game or select a difficulty
    if display is 1, let user quit game and go back to main page
    if display is 2, let user go back to main page without changing anything
*/
const HomeButton = (props) => {
  /*
    display : integer = determines which page to display
    returnHome ; function = sets display to zero, returning to main page
    toggle : function = sets display to input, traveling to that page
    theme : integer = determines color scheme
  */
  const { display, returnHome, toggle, theme } = props;

  // sets display to '2' => shows difficulty selection
  const returnToSelection = () => {
    toggle(Number(2))
  }

  return (
    <>
    {
      display == 0
        ?
        null
        :
        display == 1
          ?
          theme === 0
          ?
          <button
            className="homeButton"
            onClick={returnHome}
          >
          Go back
          </button>
          :
          <button
            className="button-49"
            onClick={returnHome}
          >Give_up</button>
          :
          display == 2
            ?
            theme === 0
            ?
            <button
              className="homeButton"
              onClick={returnHome}
            >No Changes</button>
            :
            <button
              className="selectButton"
              onClick={returnHome}
              >No_changes</button>
            :
            display == 3
              ?
              <button
                className="homeButton"
                onClick={returnToSelection}
              >Make a Change</button>
              :
              null
    }
    </>
  )

}

export default HomeButton;