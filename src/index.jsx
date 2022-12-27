import React from "react"
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));

import AppRoot from './App/AppRoot.jsx'
import './_root.scss'

root.render(<AppRoot />);