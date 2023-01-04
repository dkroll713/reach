import React from 'react';

import Row from './ModalRow.jsx'

const CharacterModal = (props) => {
  const { characterize, length } = props;
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

  const chars = [
    "ﾛ", // DB 0
    "ﾅ", // C5 1
    "ﾁ", // C1 2
    "ﾀ", // C0 3
    "ﾑ", // D1 4
    "ﾎ", // CE 5
    "ｩ", // A9 6
    "ﾗ", // D7 7
    "ｶ", // B6 8
    "ﾊ", // CA 9
  ]


  const setChar = (e) => {
    characterize(e)
  }

  // create rows
  let rows = [];
  let row = [];
  let half = Math.ceil(length/2)
  let spliceColors = JSON.parse(JSON.stringify(key))
  let splicePlaces = JSON.parse(JSON.stringify(places))
  for (let x = 0; x < length; x++) {
    let char = chars[x];
    let properties = {
      index:x,
      char:char,
    }
    row.push(properties);
    if (((x+1) % half === 0 && x !== 0) || x === length-1) {
      rows.push(row);
      row = [];
    }
  }
  console.log(rows);

  return (
    <>
    <div className="triangle">

    </div>
    <div className="charModal">
        {
          rows.map((row,x) => {
            return (
              <Row
                key={x*327}
                row={row}
                setChar={setChar}
              />
            )
          })
        }
    </div>
    </>
  )
}

export default CharacterModal;