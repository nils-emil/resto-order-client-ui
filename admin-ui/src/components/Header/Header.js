import React from 'react'
import './styles.scss'
import { Link } from 'react-router-dom'

function Header(props) {

  return (
    <div className="header">
      <Link to="/admin" className="header__name">
        <p>Sinu restoran</p>
      </Link>
    </div>
  )
}

export default Header
