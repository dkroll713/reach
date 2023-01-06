import React, { useState } from 'react';

import Selector from './Selector.jsx'

/*
  leftover from refactor - uses a dropdown to select numbers making up a guess
*/
const Selectors = (props) => {
  const { guessers, difficulty } = props;
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
            console.log(keys[index])
            return (
              <Selector
                possibleAnswers={hard}
                set={guessers[keys[index]]}
              />
            )
          })
          :
          count.map((num, index) => {
            return (
              <Selector
                possibleAnswers={standard}
                set={guessers[keys[index]]}
              />
            )
          })
      }
    </>
  )

}

export default Selectors;