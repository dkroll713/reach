import React, { useState, useEffect, useContext } from 'react';

import { ConnectionContext } from '../AppRoot.jsx'

const LocalToggle = (props) => {
  const { theme, local, setLocal } = props;
  const connected = useContext(ConnectionContext)

  const locs = {
    0:'left',
    1:'right'
  }
  const [loc, setLoc] = useState(locs[local])

  const toggle = () => {
    if (loc === 'left') {
      setLoc('right')
      setLocal(1)
    } else if (loc === 'right') {
      setLoc('left')
      setLocal(0)
    }
  }
  const key = {
    0:'local',
    1:'cloud'
  }

  return (
    null
    // <div></div>
    // <div className="localToggle">
    //   {
    //     theme === 0
    //     ?
    //     <div
    //       className="rectangleCircles"
    //       style={{'justifyContent':loc}}
    //     >
    //       <div
    //         className="switchCircles"
    //         onClick={toggle}
    //       >
    //       </div>
    //     </div>
    //     :
    //     <div
    //       className="rectangleMatrix"
    //       style={{'justifyContent':loc}}
    //     >
    //       <div
    //         className="switchMatrix"
    //         onClick={toggle}
    //       >
    //       </div>
    //     </div>
    //   }
    //   {key[local]}
    // </div>
  )
}

export default LocalToggle;