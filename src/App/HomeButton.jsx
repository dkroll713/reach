import React from 'react';

const HomeButton = (props) => {
  const { display, returnHome, toggle, theme } = props;

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