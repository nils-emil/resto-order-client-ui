import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import '../main.scss'
import { CssBaseline } from '@material-ui/core';
import Admin from '../pages/admin/index';
import Client from '../pages/client/index';
import { PopupConsumer, PopupProvider } from "../services/popup-context";
import SnackBar from "./Snackbar/SnackBar";
import { ShoppingCartProvider } from "../services/shoppingCartContext";

require('dotenv').config();

class App extends Component {

  render() {
    return (
      <div className="page">
        <CssBaseline/>
        <Router>
          <Switch>
            <PopupProvider>
              <Route path="/admin" component={Admin}/>
              <ShoppingCartProvider>
                <Route path="/" component={Client}/>
              </ShoppingCartProvider>
              <PopupConsumer>
                {({ messages, removeMessage }) => messages.map((elemenet, index) =>
                  <SnackBar
                    key={elemenet.id}
                    offset={index}
                    text={elemenet.text}
                    _id={elemenet.id}
                    isOpen={true}
                    handleClose={removeMessage}
                  />
                )}
              </PopupConsumer>
            </PopupProvider>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
