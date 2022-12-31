import React from 'react';

import Row from './ModalRow.jsx'

const ColorModal = (props) => {
  const { colorize, length } = props;
  const lengthArr = new Array(length).fill(0)
  const key = [
    "red",
    "blue",
    "green",
    "orange",
    "yellow",
    "purple",
    "pink",
    "black",
    "aquamarine",
    "beige"
  ]
  const places = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth"
  ]


  const setColor = (e) => {
    colorize(e)
  }

  // create rows
  let rows = [];
  let row = [];
  let half = Math.ceil(length/2)
  let spliceColors = JSON.parse(JSON.stringify(key))
  let splicePlaces = JSON.parse(JSON.stringify(places))
  for (let x = 0; x < length; x++) {
    let color = spliceColors[x];
    let place = splicePlaces[x];
    let properties = {
      index:x,
      color:color,
      place:place
    }
    row.push(properties);
    if (((x+1) % half === 0 && x !== 0) || x === length-1) {
      rows.push(row);
      row = [];
    }
  }

  return (
    <div className="colorModal">
        {
          rows.map((row,x) => {
            return (
              <Row
                row={row}
                setColor={setColor}
              />
            )
          })
        }
      {/* <div className="row">
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
      </div> */}
    </div>
  )
}

export default ColorModal;