import React from 'react'
import './styles.scss'

import { CreditCard, ExclamationSolid, Phone } from '../../resources/icons_index'

function FeedSelector(props) {

  const { isServiceCallSelected, selectServiceCalls, isServiceRequiringCallAttention, selectOrders, isOrderRequiringAttention } = props

  return (
    <div className="feed-selector">
      <div className={`feed-selector__button ${isServiceCallSelected ? 'feed-selector__button--active' : ''}`} onClick={selectServiceCalls}>
        <Phone className="feed-selector__icon"/>
        {isServiceRequiringCallAttention && <ExclamationSolid className="feed-selector__exclamation_icon"/>}
      </div>
      <div className={`feed-selector__button ${!isServiceCallSelected ? 'feed-selector__button--active' : ''}`} onClick={selectOrders}>
        <CreditCard className="feed-selector__icon"/>
        {isOrderRequiringAttention && <ExclamationSolid className="feed-selector__exclamation_icon"/>}
      </div>
    </div>
  )
}

export default FeedSelector
