import React, { useState } from 'react';

import SelectorCircle from './SelectorCircle.jsx'

const SelectorsCircle = (props) => {
  const { guessers, difficulty, guess, setGuess } = props;
  const [standard,setStandard] = useState(new Array(8).fill(0));
  const [hard, setHard] = useState(new Array(10).fill(0));
  const keys = Object.keys(guessers).splice(1);
  const count = difficulty === '2'
    ? new Array(6).fill(0)
    : new Array(4).fill(0);

  return (
    <>
      {
        difficulty === '2'
          ?
          count.map((num,index) => {
            return (
              <SelectorCircle
                key={index}
                id={index}
                guess={guess}
                setGuess={setGuess}
                possibleAnswers={hard}
                set={guessers[keys[index]]}
              />
            )
          })
          :
          count.map((num, index) => {
            return (
              <SelectorCircle
                key={index}
                id={index}
                guess={guess}
                setGuess={setGuess}
                possibleAnswers={standard}
                set={guessers[keys[index]]}
              />
            )
          })
      }
    </>
  )

}

export default SelectorsCircle;