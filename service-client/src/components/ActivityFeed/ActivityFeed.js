import React, { useEffect, useState } from 'react'
import './styles.scss'
import io from 'socket.io-client'
import { Add } from '../../resources/icons_index'

const socket = io(process.env.REACT_APP_BACKEND_URL)

function ActivityFeed(props) {

  const [serviceCalls, setServiceCalls] = useState([])

  useEffect(() => {
    socket.on('ALL_UNSERVICED_TABLES', (data) => {
      setServiceCalls(data)
    })

    socket.emit('GET_ALL_UNSERVICED_TABLES')

    return () => {
      socket.off('ALL_UNSERVICED_TABLES')
    }
  }, [])


  useEffect(() => {
    socket.on('SERVICE_CALLED', function (data) {
      setServiceCalls([data, ...serviceCalls])
    })

    return () => {
      socket.off('SERVICE_CALLED')
    }
  })

  const markAsServiced = (call) => {
    let callsCopy = [...serviceCalls]
    callsCopy.forEach(originalCall => {
        if (originalCall === call) {
          originalCall.isWaiting = !call.isWaiting
        }
      }
    )

    setServiceCalls(callsCopy)
    socket.emit('MARK_TABLE_SERVICED', {
      _id: call._id
    })
  }

  return (
    <div className="activity-feed">
      <h1 className="activity-feed__header">Viimased teated</h1>
      {serviceCalls.length === 0 && <p className="activity-feed__no_content_message">Täna pole uusi teateid</p>}
      {serviceCalls.map(call => {
        return (
          <div
            onClick={() => markAsServiced(call)}
            className={`activity-item ${call.isWaiting ? 'activity-item--alert' : ''}`}
            key={call._id}
          >
            <p className="activity-item__message">{call.message}</p>
            <p className="activity-item__time-stamp">{call.callTime}</p>
          </div>
        )
      })}
      <Add style={{ width: '2rem', fill: 'red' }}
           onClick={() => socket.emit('CALL_SERVICE', { message: 'Nils tahab süüa' })}/>
    </div>
  )
}

export default ActivityFeed
