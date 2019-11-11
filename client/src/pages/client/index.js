import React, { useEffect, useState } from 'react';
import BottomActions from '../../components/BottomActions/BottomActions';
import { Route, Switch } from 'react-router-dom'
import ClientCodeEntry from './ClientCodeEntry/ClientCodeEntry';
import Bill from './Bill/Bill';
import Bartab from './Bartab/Bartab';
import Header from '../../components/Header/Header';
import MenuDrawer from '../../components/MenuDrawer/MenuDrawer';
import Menu from './Menu/Menu';
import io from "socket.io-client";

function Client(props) {
  const [isDrawerOpen, toggleDrawer] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io(process.env.REACT_APP_BACKEND_URL));
  }, []);

  const header = () => {
    return props.location.pathname !== '/' && <Header isClientView={true}/>
  };

  const footer = () => {
    return props.location.pathname !== '/' && <BottomActions socket={socket} openDrawer={() => toggleDrawer(true)}/>
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
          <Route exact path="/tab" component={Bartab}/>
          <Route exact path="/menu" component={Menu}/>
        </Switch>
        {footer()}
      </div>
    </span>
  )
}

export default Client;
