import React, {useState} from 'react';
import BottomActions from '../../components/BottomActions/BottomActions';
import {Route, Switch} from 'react-router-dom';
import ClientCodeEntry from './ClientCodeEntry/ClientCodeEntry';
import Bill from './Bill/Bill';
import Header from '../../components/Header/Header';
import MenuDrawer from '../../components/MenuDrawer/MenuDrawer';
import Menu from './Menu/Menu';

function Client(props) {
  const [isDrawerOpen, toggleDrawer] = useState(false);

  const header = () => {
    return props.location.pathname !== '/' && <Header isClientView={true}/>
  };

  const footer = () => {
    return props.location.pathname !== '/' && <BottomActions openDrawer={() => toggleDrawer(true)}/>
  };

  return (
    <span>
      {header()}
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
        {footer()}
      </div>
    </span>
  )
}

export default Client;
