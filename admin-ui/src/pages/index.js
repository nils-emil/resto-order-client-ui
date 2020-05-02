import React, { useEffect } from 'react'
import MenuList from './MenuList/MenuList'
import FrontPage from './FrontPage/FrontPage'
import { Redirect, Route, Switch } from 'react-router-dom'
import Header from '../components/Header/Header'
import { connect } from 'react-redux'
import axios from 'axios'
import { authCheckState } from '../store/actions/auth'

function Admin(props) {

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = token
    }
    props.tryAutoLogin()
  }, [])

  let routes = null

  if (props.auth.token) {
    routes = <Switch>
      <Route exact path="/admin/menu-list" component={MenuList}/>
      <Route path="/admin" component={FrontPage}/>
    </Switch>
  }

  if (!props.auth.loading && !props.auth.token) {
    routes = <Redirect to='/login'/>
  }

  return (
    <div className="page">
      <div className="row">
        <Header/>
      </div>
      <div className="row row--body">
        {routes}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryAutoLogin: () => dispatch(authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
