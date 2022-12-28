import React, { useEffect } from 'react';
import Guess from './Guess.jsx'

const Feedbacks = (props) => {
  const { guesses, feedbacks } = props;

  return (
    <div className="feedbacks">
      {
        guesses.map((guess,index) => {
          return (
            <Guess
              guess={guess}
              feedback={feedbacks[index]}
            />
          )
        })
      }
    </div>
  )

}

export default Feedbacks