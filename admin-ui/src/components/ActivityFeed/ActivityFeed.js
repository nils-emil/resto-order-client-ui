import React, { useState } from 'react'
import './styles.scss'
import Feed from '../Feed/Feed'
import FeedSelector from '../FeedSelector/FeedSelector'
import { loadModal } from '../../store/actions/modal'
import { connect } from 'react-redux'
import { ORDER_MODAL, CONFIRM_MODAL } from '../Modal/Types'


function ActivityFeed(props) {

  const { serviceCalls, orders, toggleServiceCallWaiting, toggleOrderWaiting } = props

  const [isServiceCallSelected, selectServiceCalls] = useState(true)

  const openOrderModal = (order) => {
    props.loadModal(ORDER_MODAL, {
      order: order,
      modalResponseCallback: function (response) {
        if (response.isConfirm) {
          toggleOrderWaiting(response.order)
        }
      }
    })
  }

  const openConfirmModal = (order) => {
    props.loadModal(CONFIRM_MODAL, {
      modalText: 'Kas soovid kutsungi staatust muuta?',
      confirmButtonText: 'Muuda',
      modalResponseCallback: function (response) {
        if (response) {
          toggleServiceCallWaiting(order)
        }
      }
    })
  }

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
            onClick={isServiceCallSelected ? openConfirmModal : openOrderModal}
      />
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  loadModal: (modelType, modalResponseCallback) => dispatch(loadModal(modelType, modalResponseCallback))
})

export default connect(null, mapDispatchToProps)(ActivityFeed)
