import React from 'react'
import './styles.scss'

function FeedWithHeader(props) {

  const {header, serviceCalls, markAsServiced} = props

  return (
    <div className="feed">
      <h1 className="feed__header">{header}</h1>
      <div className="feed__item-container">
      {serviceCalls.length === 0 && <p className="feed__no_content_message">Täna pole uusi teateid</p>}
      {serviceCalls.map(call => {
        return (
          <div
            onClick={() => markAsServiced(call)}
            className={`feed-item ${call.isWaiting ? 'feed-item--alert' : ''}`}
            key={call._id}
          >
            <p className="feed-item__message">{call.message}</p>
            <p className="feed-item__time-stamp">{call.callTime}</p>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default FeedWithHeader
