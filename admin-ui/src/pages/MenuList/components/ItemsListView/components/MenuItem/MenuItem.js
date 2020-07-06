import React from 'react'
import './styles.scss'

function MenuItem(props) {

  const { menuItem, onClick } = props
  const { imageUrl, title, price } = menuItem


  const convertedPrice = () => {
    const priceParts = price.toString().split('.')
    const priceFullPart = priceParts[0]
    let priceCentPart = priceParts[1] || '00'

    while (priceCentPart.length < 2) {
      priceCentPart += '0'
    }

    return `${priceFullPart}.${priceCentPart}€`
  }

  return (
    <div className="menu-item" onClick={onClick}>
      <img className="menu-item__image" src={imageUrl} alt=""/>
      <p className="menu-item__name">{title}</p>
      <p className="menu-item__price">{convertedPrice()}</p>
    </div>
  )
}

export default MenuItem
