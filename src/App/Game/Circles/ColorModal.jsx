import React from 'react';

import Row from './ModalRow.jsx'

/*
  responsible for the color selection modal when a selector circle is clicked
*/
const ColorModal = (props) => {
  /*
    colorize : function = provides circle divs with color
    length : integer = params.digits aka the number of colors needing rendering
  */
  const { colorize, length } = props;

  /*
    parallel arrays are convenient for dynamically producing color objects
    key = color names to include in html element, used in parsing guess from colored circles
    places = css class that paints the circle
  */
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

  // dynamically create rows of colors to display in the modal
  let rows = [];
  let row = [];
  let half = Math.ceil(length/2)

  for (let x = 0; x < length; x++) {
    let color = key[x];
    let place = places[x];
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