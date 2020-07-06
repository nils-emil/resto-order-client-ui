import React from 'react'
import './styles.scss'
import { Link } from 'react-router-dom'
import { Home, LockClosed, Map } from '../../resources/icons_index'
import { logout } from '../../store/actions/auth'
import { connect } from 'react-redux'
import { pages } from '../Navigation/Navigation'

const isMobile = window.matchMedia('only screen and (max-width: 760px)').matches

function Header(props) {

  const links = [
    {
      page: pages.HOME,
      text: 'Haldus',
      icon: Home,
      linkTo: '/admin'
    },
    {
      page: pages.MENU,
      text: 'Menüü',
      icon: Map,
      linkTo: '/admin/menu-list'
    },
    {
      text: 'Logi välja',
      linkTo: '/login',
      onClick: props.logout
    }
  ]

  const HeaderNavigation = () => {
    if (isMobile) {
      return (
        <Link to="/login">
          <LockClosed className="header__logout-button" onClick={props.logout}/>
        </Link>
      )
    } else {
      return links.map(link => {
        return (
          <Link to={link.linkTo} className="header__navigation-item">
            <p>{link.text}</p>
          </Link>
        )
      })
    }
  }

  return (
    <div className="header">
      <HeaderNavigation/>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Header)
