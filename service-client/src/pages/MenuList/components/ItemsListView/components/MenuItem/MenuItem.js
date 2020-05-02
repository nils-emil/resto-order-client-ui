import React from 'react'
import './styles.scss'

function MenuItem(props) {

  const { menuItem, onClick } = props
  const { imageUrl, title, price } = menuItem

  return (
    <div className="menu-item" onClick={onClick}>
      <img className="menu-item__image" src={imageUrl} alt=""/>
      <p className="menu-item__name">{title}</p>
      <p className="menu-item__price">{price}€</p>
    </div>
  )
}

export default MenuItem
