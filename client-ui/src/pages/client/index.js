import React, { useEffect, useState } from 'react'
import BottomActions from '../../components/BottomActions/BottomActions'
import { Redirect, Route, Switch } from 'react-router-dom'
import ClientCodeEntry from './ClientCodeEntry/ClientCodeEntry'
import Bill from './Bill/Bill'
import Bartab from './Bartab/Bartab'
import MenuDrawer from '../../components/MenuDrawer/MenuDrawer'
import Menu from './Menu/Menu'
import io from 'socket.io-client'

function Client(props) {
  const [isDrawerOpen, toggleDrawer] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    localStorage.removeItem('organizationId')
    setSocket(io(process.env.REACT_APP_BACKEND_URL));
  }, []);

  const footer = () => {
    return props.location.pathname !== '/' && <BottomActions socket={socket} openDrawer={() => toggleDrawer(true)}/>
  };

  let routes = null
  let menuDrawer = null
  let organizationId = localStorage.getItem('organizationId')
  if (organizationId) {
    menuDrawer = <MenuDrawer
      organizationId={organizationId}
      openDrawer={() => toggleDrawer(true)}
      closeDrawer={() => toggleDrawer(false)}
      isOpen={isDrawerOpen}
    />
    routes = <><Route exact path="/bill" component={Bill}/>
      <Route exact path="/tab" component={Bartab}/>
      <Route exact path="/menu" component={() => <Menu  organizationId={organizationId} />}/></>
  } else {
    routes = <Redirect to='/'/>
  }
  return (
    <span>
      {menuDrawer}
      <div className="main-scroll">
        <Switch>
          <Route exact path="/" component={ClientCodeEntry}/>
          {routes}
        </Switch>
        {footer()}
      </div>
    </span>
  )
}

export default Client;
