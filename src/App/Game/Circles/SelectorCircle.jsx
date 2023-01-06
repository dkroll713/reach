import React, { useState } from 'react';

import Circle from './Circle.jsx'
import ColorModal from './ColorModal.jsx'

/*
  responsible for each individual selector, including the selection modal, whether to allow
  more than one modal to be open at a time, and whether a guess can be submitted
*/
const SelectorCircle = (props) => {
  /*
    id : integer = index of selector circle, used to track which character in the guess string to alter
    guess : string = the guess before any color is selected
    setGuess : function = sets guess strig === to input of function
    params : object = the settings for this game
    modalCount : integer = used to facilitate only opening one modal at a time
    setModalCount : function = sets modal count === to input of function
    activeModal : null/integer = index of the selector with currently open modal - if none are open, null
    setActiveModal : function = sets activeModal === to input of function
    chosen : array = boolean array representing which selector's have already chosen a color; used
      to prevent guessing before all selectors have been chosen aka while guess is incomplete
    setChosen : function = replaces existing chosen array with new chosen array
  */
  const {
    id, guess, setGuess, params, modalCount,
    setModalCount, activeModal, setActiveModal,
    chosen, setChosen
  } = props;

  // if true, display modal
  const [modal, setModal] = useState(false)
  // preserves selection outside of html
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

  // opens modal if no other modals are available, otherwise closes modal and allows other modals to open
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


  // sets color of circle equal to the color selected from modal
  const colorize = (e) => {
    const name = e.target.getAttribute('name')
    setColor(name);
    let newGuess = guess.split('');
    newGuess[id]=key[name]
    setGuess(newGuess.join(''));
    chosen[id] = true;
    let newChosen = [...chosen]
    setChosen(newChosen);
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