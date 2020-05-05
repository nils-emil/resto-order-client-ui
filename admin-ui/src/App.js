import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './main.scss'
import './resources/animations.scss'
import Page from './pages'
import Login from './pages/Login/Login'
import ModalContainer from './services/modalService'
import PopUpContainer from './services/popupService'

function App(props) {

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/" component={Page}/>
      </Switch>
      <ModalContainer/>
      <PopUpContainer/>
    </Router>
  )
}

export default App
