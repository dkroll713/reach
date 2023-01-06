import React from 'react';

import ThemeToggle from '../ThemeToggle.jsx'
import Connection from './Connection.jsx'
import Current from '../Auth/Current.jsx'

const Header = (props) => {
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