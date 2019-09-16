import React, {useState} from 'react';
import BottomActions from '../../components/BottomActions/BottomActions';
import {Route, Switch} from 'react-router-dom';
import ClientCodeEntry from './ClientCodeEntry/ClientCodeEntry';
import FoodPicker from './FoodPicker/FoodPicker';
import Header from '../../components/Header/Header';
import MenuDrawer from '../../components/MenuDrawer/MenuDrawer';

function Client() {
  const [isDrawerOpen, toggleDrawer] = useState(false);

  return (
    <span>
      <Header
        isClientView={true}
        openDrawer={() => toggleDrawer(true)}
      />
      <MenuDrawer
        isOpen={isDrawerOpen}
      />
      <div className="main-scroll">
        <Switch>
          <Route exact path="/" component={ClientCodeEntry}/>
          <Route exact path="/food" component={FoodPicker}/>
        </Switch>
        <BottomActions/>
      </div>
    </span>
  )
}

export default Client;
