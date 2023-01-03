import React from 'react';

import Easy from './Difficulty/Easy.jsx'
import Standard from './Difficulty/Standard.jsx'
import Hard from './Difficulty/Hard.jsx'
import Custom from './Difficulty/Custom.jsx'

const ActiveRules = (props) => {
  const { display, difficulty, difficulties, settings, setSettings, theme } = props;

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