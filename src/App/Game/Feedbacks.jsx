import React, { useEffect } from 'react';
import Guess from './Guess.jsx'

/*
  iterates through guess history array and programatically
  generates components containing feedback and guess histories
*/
const Feedbacks = (props) => {
  /*
    guesses : array = contains guess history
    feedbacks : array = contains feedback history
    difficulty : integer = represents the selected difficulty
    params : object = game settings
    theme : integer = determines color scheme
  */
  const {
    guesses, feedbacks, difficulty, params, theme
  } = props;

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