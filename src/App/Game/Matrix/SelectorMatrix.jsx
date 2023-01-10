import React, { useState } from 'react';

import CharacterModal from './CharacterModal.jsx'

/*
  responsible for each individual selector, including the selection modal, whether to allow
  more than one modal to be open at a time, and whether a guess can be submitted
*/
const SelectorMatrix = (props) => {
  /*
    id : integer = index of selector circle, used to track which character in the guess string to alter
    guess : string = the guess before any color is selected
    setGuess : function = sets guess strig === to input of function
    params : object = the settings for this game
    modalCount : integer = used to facilitate only opening one modal at a time
    setModalCount : function = sets modal count === to input of function
    activeModal : null/integer = index of the selector with currently open modal - if none are open, null
    setActiveModal : function = sets activeModal === to input of function
    chosen : array = boolean array representing which selector's have already chosen a symbol; used
      to prevent guessing before all selectors have been chosen aka while guess is incomplete
    setChosen : function = replaces existing chosen array with new chosen array
  */
  const {
    id, guess, setGuess, params, modalCount, setModalCount,
    activeModal, setActiveModal, chosen, setChosen
  } = props;

  // if true, display modal
  const [modal, setModal] = useState(false)
  // preserve selection outside html
  const [char, setChar] = useState(null)
  const key = {
    "ﾛ": 0, // DB 0
    "ﾅ": 1, // C5 1
    "ﾁ": 2, // C1 2
    "ﾀ": 3, // C0 3
    "ﾑ": 4, // D1 4
    "ﾎ": 5, // CE 5
    "ｩ": 6, // A9 6
    "ﾗ": 7, // D7 7
    "ｶ": 8, // B6 8
    "ﾊ": 9, // CA 9
  }

  // opens modal if no other modals are available, otherwise closes modal and allows other modals to open
  const openCharMenu = (e) => {
    if (modalCount === 0 && !activeModal) {
      setActiveModal(id);
      setModal(true)
      setModalCount(modalCount + 1);
    } else if (activeModal === id) {
      setActiveModal(null)
      setModalCount(modalCount - 1);
      setModal(false)
    }
  }

  // sets symbol in box equal to the selected symbol
  const characterize = (e) => {
    const name = e.target.getAttribute('name')
    setChar(name);
    let newGuess = guess.split('');
    newGuess[id] = key[name]
    setGuess(newGuess.join(''));
    chosen[id] = true;
    let newChosen = [...chosen]
    setChosen(newChosen);
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