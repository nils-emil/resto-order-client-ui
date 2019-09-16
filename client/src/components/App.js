import React, {Component} from 'react';
import Header from './Header/Header'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import '../main.scss'
import {CssBaseline} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Admin from '../pages/admin/index';
import Client from '../pages/client/index';

require('dotenv').config();

class App extends Component {

  styles = makeStyles({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      minHeight: '64px'
    }
  });

  render() {
    return (
      <div className="page">
        <CssBaseline/>
        <Router>
          <Header/>
          <div className="main-scroll">
            <Switch>
              <Route path="/admin" component={Admin}/>
              <Route path="/" component={Client}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
