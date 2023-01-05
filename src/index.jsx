import React from "react"
import { createRoot } from "react-dom/client";
import { Auth0Provider} from "@auth0/auth0-react"

const {auth0client, auth0domain} = require('../config.js')

const root = createRoot(document.getElementById("root"));

import AppRoot from './App/AppRoot.jsx'
import './_root.scss'

root.render(
  <Auth0Provider
    domain={auth0domain}
    clientId={auth0client}
    redirectUri={'http://localhost:3000'}
  >
    <AppRoot />
  </Auth0Provider>
);