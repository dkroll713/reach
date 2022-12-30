import React, { useState } from 'react';

import Circle from './Circle.jsx'
import ColorModal from './ColorModal.jsx'

const SelectorCircle = (props) => {
  const { possibleAnswers, id, set } = props;
  const [modal, setModal] = useState(false)
  const [color, setColor] = useState(null)

  const setGuess = (e) => {
    set(e.target.value);
  }

  const openColorMenu = (e) => {
    setModal(!modal)
  }

  const colorize = (e) => {
    const name = e.target.getAttribute('name')
    setColor(name);
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
              colorize={colorize}
            />
          :
          null
      }
    </div>
  )
}

export default SelectorCircle;