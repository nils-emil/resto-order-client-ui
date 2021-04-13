import React, { useEffect, useState } from 'react'
import BottomActions from '../../components/BottomActions/BottomActions'
import { Redirect, Route, Switch } from 'react-router-dom'
import ClientCodeEntry from './ClientCodeEntry/ClientCodeEntry'
import Bill from './Bill/Bill'
import MenuDrawer from '../../components/MenuDrawer/MenuDrawer'
import Menu from './Menu/Menu'
import { ToastContainer } from 'react-toastify'

function Client(props) {
  const [isDrawerOpen, toggleDrawer] = useState(false);

  useEffect(() => {
  }, []);

  const footer = () => {
    return props.location.pathname !== '/' && <BottomActions openDrawer={() => toggleDrawer(true)}/>
  };

  let routes = null
  let menuDrawer = null
    menuDrawer = <MenuDrawer
      openDrawer={() => toggleDrawer(true)}
      closeDrawer={() => toggleDrawer(false)}
      isOpen={isDrawerOpen}
    />
    routes = <><Route exact path="/bill" render={(props) => (<Bill {...props} />)}/>
      <Route exact path="/menu" component={() => <Menu />}/></>
    // routes = <Redirect to='/'/>
  return (
    <span>
      <ToastContainer/>
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
