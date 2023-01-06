import React from 'react';

import Easy from './Difficulty/Easy.jsx'
import Standard from './Difficulty/Standard.jsx'
import Hard from './Difficulty/Hard.jsx'
import Custom from './Difficulty/Custom.jsx'

/*
  responsible for displaying the selected ruleset during gameplay, based on difficulty
*/
const ActiveRules = (props) => {
  /*
    display : integer = determines which main page to display
    difficulty : integer = represents selected difficulty
    settings : object = game settings
    theme : integer = determines color scheme
  */
  const {
    display, difficulty, settings, theme
  } = props;

  return (
    <>
    {
      difficulty == 0
        ?
          <Easy theme={theme} />
        :
          difficulty == 1
            ?
              <Standard theme={theme}/>
            :
              difficulty == 2
                ?
                  <Hard theme={theme}/>
                :
                  difficulty == 3
                  ?
                  <Custom
                    display={display}
                    settings={settings}
                    theme={theme}
                  />
                  :
                  null
    }
    </>
  )
}

export default ActiveRules