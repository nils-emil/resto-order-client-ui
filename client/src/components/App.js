import React, {Component} from 'react';
import ClientCodeEntry from '../pages/client/ClientCodeEntry/ClientCodeEntry';
import FoodPicker from '../pages/client/FoodPicker/FoodPicker';
import Admin from '../pages/admin/index/Admin';
import Header from './Header/Header'
import {BrowserRouter as Router, Route} from "react-router-dom"
import '../main.scss'
import MenuList from '../pages/admin/MenuList/MenuList';
import {CssBaseline} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import ItemEdit from '../pages/admin/ItemEdit/ItemEdit';

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
          <Route exact path="/food" component={FoodPicker}/>
          <Route exact path="/admin" component={Admin}/>
          <Route exact path="/admin/menu-list" component={MenuList}/>
          <Route exact path="/admin/item-edit" component={ItemEdit}/>
          <Route exact path="/" component={ClientCodeEntry}/>
        </Router>
      </div>
    );
  }
}

export default App;
