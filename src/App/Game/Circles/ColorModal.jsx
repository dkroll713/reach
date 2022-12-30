import React from 'react';

const ColorModal = (props) => {
  const { colorize } = props;

  const setColor = (e) => {
    colorize(e)
  }

  return (
    <div className="colorModal">
      <div className="row">
        <div name={"red"} className="circle first" onClick={setColor}></div>
        <div name={"blue"} className="circle second" onClick={setColor}></div>
        <div name={"green"} className="circle third" onClick={setColor}></div>
        <div name={"orange"} className="circle fourth" onClick={setColor}></div>
      </div>
      <div className="row">
        <div name={"yellow"} className="circle fifth" onClick={setColor}></div>
        <div name={"purple"} className="circle sixth" onClick={setColor}></div>
        <div name={"pink"} className="circle seventh" onClick={setColor}></div>
        <div name={"black"} className="circle eighth" onClick={setColor}></div>
      </div>
    </div>
  )
}

export default ColorModal;