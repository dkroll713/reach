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
    "ﾛ":0, // DB 0
    "ﾅ":1, // C5 1
    "ﾁ":2, // C1 2
    "ﾀ":3, // C0 3
    "ﾑ":4, // D1 4
    "ﾎ":5, // CE 5
    "ｩ":6, // A9 6
    "ﾗ":7, // D7 7
    "ｶ":8, // B6 8
    "ﾊ":9, // CA 9
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