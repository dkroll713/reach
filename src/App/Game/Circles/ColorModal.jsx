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
    <>
    <div className="triangle">

    </div>
    <div className="colorModal">
        {
          rows.map((row,x) => {
            return (
              <Row
                key={x*327}
                row={row}
                setColor={setColor}
              />
            )
          })
        }
    </div>
    </>
  )
}

export default ColorModal;