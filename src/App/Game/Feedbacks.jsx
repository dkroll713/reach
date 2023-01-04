import React, { useEffect } from 'react';
import Guess from './Guess.jsx'

const Feedbacks = (props) => {
  const { guesses, feedbacks, difficulty, difficulties, params, theme } = props;

  // programatically generates div containing feedback and guess histories
  return (
    <div className="feedbacks">
      {
        guesses.map((guess,index) => {
          return (
            <Guess
              key={index}
              guess={guess}
              params={params}
              feedback={feedbacks[index]}
              difficulty={difficulty}
              theme={theme}
            />
          )
        })
      }
    </div>
  )

}

export default Feedbacks