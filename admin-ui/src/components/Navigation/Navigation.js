import React from 'react'

import './styles.scss'
import { LockClosed, Home, Map } from '../../resources/icons_index'
import { Link } from 'react-router-dom'
import IconButton from '../IconButton/IconButton'
import { logout } from '../../store/actions/auth'
import { connect } from 'react-redux'

export const pages = {
  HOME: 'HOME',
  MENU: 'MENU',
  STATISTICS: 'STATISTICS'
}

function Navigation(props) {

  const links = [
    {
      page: pages.HOME,
      icon: Home,
      linkTo: '/admin'
    },
    {
      page: pages.MENU,
      icon: Map,
      linkTo: '/admin/menu-list'
    },
    {
      icon: LockClosed,
      linkTo: '/login',
      onClick: props.logout
    },
  ]

  return links.map(link => (
    <Link to={link.linkTo} onClick={() => link.onClick ? link.onClick() : null} key={link.linkTo}>
      <IconButton Icon={link.icon}/>
    </Link>
  ))
}


const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Navigation)
