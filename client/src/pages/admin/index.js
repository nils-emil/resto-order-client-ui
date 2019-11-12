import React, { useEffect } from 'react'
import ServiceCalls from './ServiceCall/ServiceCalls'
import MenuList from './MenuList/MenuList'
import ItemEdit from './ItemEdit/ItemEdit'
import FrontPage from './FrontPage/FrontPage'
import { Redirect, Route, Switch } from 'react-router-dom'
import Header from '../../components/Header/Header'
import * as actions from '../../store/actions'
import { connect } from 'react-redux'
import axios from 'axios'


function Admin (props) {

  useEffect(() => {
    const token  = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    }
    props.onTryAutoLogin()
  }, [])

  let routes = null
  if (props.auth.token) {
    routes = <Switch>
      <Route exact path="/admin/service-calls" component={ServiceCalls}/>
      <Route exact path="/admin/menu-list" component={MenuList}/>
      <Route exact path="/admin/item-edit" component={ItemEdit}/>
      <Route path="/admin" component={FrontPage}/>
    </Switch>
  }
  if (!props.auth.loading && !props.auth.token) {
    routes = <Redirect to='/login'/>
  }
  return (
    <span>
      <Header
        isClientView={false}
      />
      <div className="main-scroll">
        {routes}
      </div>
    </span>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
