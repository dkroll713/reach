import React from 'react';

const HomeButton = (props) => {
  const { display, returnHome, toggle } = props;

  const returnToSelection = () => {
    toggle(2)
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
          <button
            className="button-49"
            onClick={returnHome}
          >Give up</button>
          :
          display == 2
            ?
            <button
              className="homeButton"
              onClick={returnHome}
            >No Changes</button>
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