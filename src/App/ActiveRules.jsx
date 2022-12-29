import React from 'react';

import Easy from './Difficulty/Easy.jsx'
import Standard from './Difficulty/Standard.jsx'
import Hard from './Difficulty/Hard.jsx'
import Custom from './Difficulty/Custom.jsx'

const ActiveRules = (props) => {
  const { difficulty, difficulties } = props;

  return (
    <>
    {
      difficulty == 0
        ?
          <Easy />
        :
          difficulty == 1
            ?
              <Standard />
            :
              difficulty == 2
                ?
                  <Hard />
                :
                  difficulty == 3
                  ?
                  <Custom />
                  :
                  null
    }
    </>
  )
}

export default ActiveRules