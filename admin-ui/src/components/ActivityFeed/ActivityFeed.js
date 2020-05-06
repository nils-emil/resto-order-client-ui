import React, { useState } from 'react'
import './styles.scss'
import Feed from '../Feed/Feed'
import FeedSelector from '../FeedSelector/FeedSelector'


function ActivityFeed(props) {

  const { serviceCalls, orders, toggleServiceCallWaiting, toggleOrderWaiting } = props

  const [isServiceCallSelected, selectServiceCalls] = useState(true)

  return (
    <div className="activity-feed">
      <div>
        <FeedSelector isServiceCallSelected={isServiceCallSelected}
                      selectServiceCalls={() => selectServiceCalls(true)}
                      isServiceRequiringCallAttention={serviceCalls.some(call => {
                        return call.isWaiting
                      })}
                      selectOrders={() => selectServiceCalls(false)}
                      isOrderRequiringAttention={orders.some(order => {
                        return order.isWaiting
                      })}
        />
      </div>
      <Feed serviceCalls={isServiceCallSelected ? serviceCalls : orders}
            onClick={isServiceCallSelected ? toggleServiceCallWaiting : toggleOrderWaiting}
      />
    </div>
  )
}

export default ActivityFeed
