import React from 'react';

import ThemeToggle from '../ThemeToggle.jsx'
import Connection from './Connection.jsx'
import Current from '../Auth/Current.jsx'

/*
  responsible for top bar containing theme toggle, connection status, and sign-in/sign-out button
*/
const Header = (props) => {
  /*
    theme : integer = determines color scheme
    setTheme : function = toggles theme
    connected : boolean = shows connection status
  */
  const {
    theme, setTheme, connected,
  } = props;

  return (
    <div className="headerBar">
      <ThemeToggle
        theme={theme}
        setTheme={setTheme}
      />
      <Connection
        connected={connected}
      />
      <Current
        theme={theme}
      />
    </div>
  )
}

export default Header;