import React, { useState, useEffect, useContext } from 'react'

import ActiveRules from '../../ActiveRules.jsx'

const CustomGame = (props) => {
  const { difficulty, difficulties, settings, setSettings, display } = props;
  const [answer, useAnswer] = useState('');
  const [guess, setGuess] = useState('0000')

  console.log(props);

  return (
    <>
      <ActiveRules
        display={display}
        difficulties={difficulties}
        difficulty={difficulty}
        settings={settings}
        setSettings={setSettings}
      />
    </>
  )
}

export default CustomGame