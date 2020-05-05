import React, { useEffect, useState } from 'react'
import './styles.scss'
import io from 'socket.io-client'
import FeedWithHeader from '../FeedWithHeader/FeedWithHeader'
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
     <FeedWithHeader header={'Tellimused'} serviceCalls={serviceCalls} markAsServiced={markAsServiced}/>
     <FeedWithHeader header={'Kutsungid'} serviceCalls={serviceCalls} markAsServiced={markAsServiced}/>
      <Add style={{ width: '2rem', fill: 'red' }}
           onClick={() => socket.emit('CALL_SERVICE', { message: 'Nils tahab süüa' })}/>
    </div>
  )
}

export default ActivityFeed
