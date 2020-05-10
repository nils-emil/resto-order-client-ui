import React from 'react'
import './styles.scss'
import { Link } from 'react-router-dom'
import { LockClosed } from '../../resources/icons_index'
import { logout } from '../../store/actions/auth'
import { connect } from 'react-redux'

const isMobile = window.matchMedia('only screen and (max-width: 760px)').matches

function Header(props) {

  return (
    <div className="header">
      <Link to="/admin" className="header__name">
        <p>Sinu restoran</p>
      </Link>
      {isMobile &&
      <Link to="/login">
        <LockClosed className="header__logout-button" onClick={props.logout}/>
      </Link>
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Header)
