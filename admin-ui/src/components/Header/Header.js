import React from 'react'
import './styles.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/auth'

function Header(props) {

  return (
    <div className="header">
      <Link to="/" className="header__name">
        <p>Sinu restoran</p>
      </Link>
      <Link to="/login" className="header__logout">
        <p onClick={props.logout}>Logi välja</p>
      </Link>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Header)
