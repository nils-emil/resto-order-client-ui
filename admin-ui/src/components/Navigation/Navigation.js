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

  const { currentPage } = props

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

  return links.filter(link => link.page !== currentPage).map(link => (
    <Link to={link.linkTo} onClick={() => link.onClick ? link.onClick() : null} key={link.page}>
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
