import React, { useState } from 'react';

/*
  responsible for the theme toggle which toggles between circle theme and matrix theme
*/
const ThemeToggle = (props) => {
  const {
    theme, setTheme
  } = props;

  // loc : string = determines if switch is flipped left or right
  const [loc, setLoc] = useState('left')
  const key = {
    0: 'Circles',
    1: 'Matrix'
  }

  // literally 'flips the switch' left or right
  const toggle = () => {
    if (loc === 'left') {
      setLoc('right')
      setTheme(1)
    } else if (loc === 'right') {
      setLoc('left')
      setTheme(0)
    }
  }

  // console.log('current theme is:', key[theme])
  return (
    <div className="themeToggle">
      {
        theme === 0
          ?
          <div
            className="rectangleCircles"
            style={{ 'justifyContent': loc }}
          >
            <div
              className="switchCircles"
              onClick={toggle}
            >
            </div>
          </div>
          :
          <div
            className="rectangleMatrix"
            style={{ 'justifyContent': loc }}
          >
            <div
              className="switchMatrix"
              onClick={toggle}
            >
            </div>
          </div>
      }

      {key[theme]}
    </div>
  )
}

export default ThemeToggle;