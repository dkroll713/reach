import React, { useEffect } from 'react';
import Guess from './Guess.jsx'

const Feedbacks = (props) => {
  const { guesses, feedbacks, difficulty, difficulties } = props;
  return (
    <div className="feedbacks">
      {
        guesses.map((guess,index) => {
          return (
            <Guess
              key={index}
              guess={guess}
              feedback={feedbacks[index]}
              difficulty={difficulty}
            />
          )
        })
      }
    </div>
  )

}

export default Feedbacks