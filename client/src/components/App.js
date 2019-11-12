import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import '../main.scss'
import { createMuiTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core'
import Admin from '../pages/admin/index'
import Client from '../pages/client/index'
import Login from '../pages/admin/Login/Login'
import { green, red } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
      primary: green,
      error: red,
      contrastThreshold: 3,
      tonalOffset: 0.2,
    }
  },
)

class App extends Component {

  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="page">
          <CssBaseline/>
          <Router>
            <Switch>
              <Route path="/login" component={Login}/>
              <Route path="/admin" component={Admin}/>
              <Route path="/" component={Client}/>
            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
    )
  }
}


export default App
