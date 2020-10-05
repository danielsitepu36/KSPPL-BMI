import React, { Component } from "react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles/";

import Home from "./pages/home";
import themeFile from "./util/theme";

const theme = createMuiTheme(themeFile);

class App extends Component {
  render() {
    return (
      <div className="container">
        <MuiThemeProvider theme={theme}>
          <Home />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
