import React from 'react';
import ServiceCalls from './ServiceCall/ServiceCalls';
import MenuList from './MenuList/MenuList';
import ItemEdit from './ItemEdit/ItemEdit';
import FrontPage from './FrontPage/FrontPage';
import {Route, Switch} from 'react-router-dom';
import Header from '../../components/Header/Header';

function Admin() {
  return (
    <span>
      <Header
        isClientView={false}
      />
      <div className="main-scroll">
        <Switch>
          <Route exact path="/admin/service-calls" component={ServiceCalls}/>
          <Route exact path="/admin/menu-list" component={MenuList}/>
          <Route exact path="/admin/item-edit" component={ItemEdit}/>
          <Route path="/admin" component={FrontPage}/>
        </Switch>
      </div>
    </span>
  )
}

export default Admin;
