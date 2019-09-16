import React from 'react';
import BottomActions from '../../components/BottomActions/BottomActions';
import {Route, Switch} from 'react-router-dom';
import ClientCodeEntry from './ClientCodeEntry/ClientCodeEntry';
import FoodPicker from './FoodPicker/FoodPicker';

function Client() {
  return (
    <span>
      <Switch>
        <Route exact path="/" component={ClientCodeEntry}/>
        <Route exact path="/food" component={FoodPicker}/>
      </Switch>
      <BottomActions/>
    </span>
  )
}

export default Client;
