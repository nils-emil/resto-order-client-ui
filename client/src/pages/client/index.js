import React, {useState} from 'react';
import BottomActions from '../../components/BottomActions/BottomActions';
import {Route, Switch} from 'react-router-dom';
import ClientCodeEntry from './ClientCodeEntry/ClientCodeEntry';
import Bill from './Bill/Bill';
import Header from '../../components/Header/Header';
import MenuDrawer from '../../components/MenuDrawer/MenuDrawer';
import Menu from './Menu/Menu';

function Client() {
  const [isDrawerOpen, toggleDrawer] = useState(false);

  return (
    <span>
      <Header
        isClientView={true}
      />
      <MenuDrawer
        openDrawer={() => toggleDrawer(true)}
        closeDrawer={() => toggleDrawer(false)}
        isOpen={isDrawerOpen}
      />
      <div className="main-scroll">
        <Switch>
          <Route exact path="/" component={ClientCodeEntry}/>
          <Route exact path="/bill" component={Bill}/>
          <Route exact path="/menu" component={Menu}/>
        </Switch>
        <BottomActions
          openDrawer={() => toggleDrawer(true)}
        />
      </div>
    </span>
  )
}

export default Client;
