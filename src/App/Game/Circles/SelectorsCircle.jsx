import React, { useState } from 'react';

import Row from './ModalRow.jsx'
import SelectorCircle from './SelectorCircle.jsx'

/*
  responsible for rendering all necessary selectors
*/
const SelectorsCircle = (props) => {
  /*
    guess : string = the current guess
    setGuess : function = sets guess === to input
    params : object = game settings
    modalCount : integer = number of modals open, used to prevent opening multiple
    setModalCount : function = sets modalCount === to input
    activeModal : null/integer = represents which modal is open - if none, null
    setActiveModal : function = sets activeModal === to input
    chosen : array = boolean array representing which selectors have been used
    setchosen : function = replaces previous chosen array with new chosen array
  */
  const {
    guess, setGuess, params, modalCount, setModalCount,
    activeModal, setActiveModal, chosen, setChosen
  } = props;

  // array where length === to length in settings allows react to iterate and render a selector component
  const count = new Array(params.comboLength).fill(0);


  return (
    count.map((num,index) => {
      return (
        <SelectorCircle
          key={index}
          id={index}
          guess={guess}
          setGuess={setGuess}
          params={params}
          modalCount={modalCount}
          setModalCount={setModalCount}
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          length={params.comboLength}
          chosen={chosen}
          setChosen={setChosen}
        />
      )
    })
  )

}

export default SelectorsCircle;