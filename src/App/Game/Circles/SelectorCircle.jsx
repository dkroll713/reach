import React, { useState } from 'react';

import Circle from './Circle.jsx'
import ColorModal from './ColorModal.jsx'

const SelectorCircle = (props) => {
  const {
    possibleAnswers, id, set, guess, setGuess, params, modalCount,
    setModalCount, activeModal, setActiveModal, length
  } = props;
  const [modal, setModal] = useState(false)

  const [color, setColor] = useState(null)
  const key = {
    "red":0,
    "blue":1,
    "green":2,
    "orange":3,
    "yellow":4,
    "purple":5,
    "pink":6,
    "black":7,
    "aquamarine":8,
    "beige":9
  }

  const openColorMenu = (e) => {
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

  const colorize = (e) => {
    const name = e.target.getAttribute('name')
    setColor(name);
    let newGuess = guess.split('');
    newGuess[id]=key[name]
    setGuess(newGuess.join(''));
  }
  return (
    <div
      name={id}
      className="circle selector"
      style={{'backgroundColor':color}}
      onClick={openColorMenu}
    >
      {
        modal
          ?
            <ColorModal
              key={id}
              length={params.digits}
              colorize={colorize}
            />
          :
          null
      }
    </div>
  )
}

export default SelectorCircle;