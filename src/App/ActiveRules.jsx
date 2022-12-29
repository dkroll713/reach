import React from 'react';

import Easy from './Difficulty/Easy.jsx'
import Standard from './Difficulty/Standard.jsx'
import Hard from './Difficulty/Hard.jsx'

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
                null
    }
    </>
  )
}

export default ActiveRules