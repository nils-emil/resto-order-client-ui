import React from 'react';
import ServiceCallTable from './ServiceCalls/ServiceCallTable';
import MenuList from './MenuList/MenuList';
import ItemEdit from './ItemEdit/ItemEdit';
import FrontPage from './FrontPage/FrontPage';
import {Route, Switch} from 'react-router-dom';

function Admin() {
  return (
    <Switch>
      <Route exact path="/admin/service-calls" component={ServiceCallTable}/>
      <Route exact path="/admin/menu-list" component={MenuList}/>
      <Route exact path="/admin/item-edit" component={ItemEdit}/>
      <Route path="/admin" component={FrontPage}/>
    </Switch>
  )
}

export default Admin;
