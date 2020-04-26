// React and React-DOM
import React from "react"
import ReactDOM from "react-dom"

// Material-UI
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import "typeface-roboto"
import theme from "./theme"
import App from "./App"

// Load Roboto typeface
require("typeface-roboto")

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
)
