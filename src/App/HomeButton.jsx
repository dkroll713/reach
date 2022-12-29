import React from 'react';

const HomeButton = (props) => {
  const { display, returnHome } = props;

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
            null
    }
    </>
  )

}

export default HomeButton;