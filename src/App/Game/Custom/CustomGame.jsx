import React, { useState, useEffect, useContext } from 'react'

import ActiveRules from '../../ActiveRules.jsx'

const CustomGame = (props) => {
  const { difficulty, difficulties } = props;
  const [answer, useAnswer] = useState('');
  const [guess, setGuess] = useState('0000')

  console.log(props);

  return (
    <>
      <ActiveRules
        difficulties={difficulties}
        difficulty={difficulty}
      />
    </>
  )
}

export default CustomGame