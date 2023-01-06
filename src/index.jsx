import React from "react"
import { createRoot } from "react-dom/client";
import { Auth0Provider} from "@auth0/auth0-react"

const {auth0client, auth0domain} = require('../config.js')

// creates a 'root' div and appends it to the page
const root = createRoot(document.getElementById("root"));

import AppRoot from './App/AppRoot.jsx'
import './_root.scss'

/*
  renders the root of the app at the top of the page
  provides auth0 functionality to the entire app
*/
root.render(
  <Auth0Provider
    domain={auth0domain}
    clientId={auth0client}
    redirectUri={'http://localhost:3000'}
  >
    <AppRoot />
  </Auth0Provider>
);