import React, { useState } from 'react';

import Row from './ModalRow.jsx'
import SelectorCircle from './SelectorCircle.jsx'

const SelectorsCircle = (props) => {
  const {
    difficulty, guess, setGuess, params, modalCount, setModalCount,
    activeModal, setActiveModal
  } = props;
  const [standard,setStandard] = useState(new Array(8).fill(0));
  const [options, setOptions] = useState(new Array(params.digits).fill(0))
  const count = new Array(params.comboLength).fill(0)


  return (
    count.map((num,index) => {
      return (
        <SelectorCircle
          key={index}
          id={index}
          guess={guess}
          setGuess={setGuess}
          possibleAnswers={options}
          params={params}
          modalCount={modalCount}
          setModalCount={setModalCount}
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          length={count.length}
        />
      )
    })
  )

}

export default SelectorsCircle;