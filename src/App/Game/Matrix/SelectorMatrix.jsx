import React, { useState } from 'react';

import CharacterModal from './CharacterModal.jsx'

const SelectorMatrix = (props) => {
  const {
    possibleAnswers, id, set, guess, setGuess, params, modalCount,
    setModalCount, activeModal, setActiveModal, length
  } = props;
  const [modal, setModal] = useState(false)
  const [char, setChar] = useState(null)
  const key = {
    "ｵ":0, // B5
    "ｦ":1, // A6
    "ｶ":2, // B6
    "ｸ":3, // B8
    "ﾇ":4, // C7
    "ｷ":5, // B7
    "ﾓ":6, // D3
    "ｺ":7, // BA
    "ﾏ":8, // CF
    "ｻ":9 // BB
  }

  const openCharMenu = (e) => {
    if (modalCount === 0 && !activeModal) {
      setActiveModal(id);
      setModal(true)
      setModalCount(modalCount+1);
    } else if (activeModal === id) {
      setActiveModal(null)
      setModalCount(modalCount-1);
      setModal(false)
    }
  }

  const characterize = (e) => {
    const name = e.target.getAttribute('name')
    setChar(name);
    let newGuess = guess.split('');
    newGuess[id]=key[name]
    setGuess(newGuess.join(''));
  }

  return (
    <div
      name={id}
      className="matrix selector"
      onClick={openCharMenu}
    >
      {char}
      {
        modal
          ?
            <CharacterModal
              key={id}
              length={params.digits}
              characterize={characterize}
            />
          :
          null
      }
    </div>
  )
}

export default SelectorMatrix