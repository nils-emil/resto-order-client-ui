import React, { useEffect, useState } from 'react'
import './styles.scss'
import { fetchAll } from '../../services/tableService'
import { connect } from 'react-redux/es/alternate-renderers'
import { showPopUpWithTimeout } from '../../store/actions/popup'
import { CONFIRM_MODAL, ORDER_MODAL } from '../Modal/Types'
import { loadModal } from '../../store/actions/modal'

function TablePlan(props) {
  const { organizationId } = props.auth.user
  const { serviceCalls = [], orders = [], toggleServiceCallWaiting, toggleOrderWaiting } = props

  const [tables, setTables] = useState([])

  useEffect(() => {
    fetchAll(organizationId).subscribe((response) => {
      const responseTables = response.data
      setTables(responseTables)
    })
  }, [organizationId])

  useEffect(() => {
    transformTables()
  }, [orders, serviceCalls])

  const transformTables = () => {
    const tablesWithLastCalls = [...tables]
    for (let table of tablesWithLastCalls) {
      table.lastCall = serviceCalls.find(call => call.isWaiting && call.tableCode === table.code)
      table.lastOrder = orders.find(order => order.isWaiting && order.tableCode === table.code)
    }
    setTables(tablesWithLastCalls)
  }

  const getTableState = (table) => {
      if (table.lastOrder !== undefined) {
        return 'is-waiting-for-order'
      } else if (table.lastCall !== undefined) {
        return 'is-waiting-for-service'
      }
  }

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

  const openConfirmModal = (serviceCall) => {
    props.loadModal(CONFIRM_MODAL, {
      modalText: 'Kas soovid viimase kutsungi staatust muuta?',
      confirmButtonText: 'Muuda',
      modalResponseCallback: function (response) {
        if (response) {
          toggleServiceCallWaiting(serviceCall)
        }
      }
    })
  }

  return (
    <div className="table-plan">
      <div className="table-plan__internal-container">
        {tables.map(table => {
          return (
            <div
              onClick={() => table.lastOrder ? openOrderModal(table.lastOrder) : openConfirmModal(table.lastCall)}
              className={`table-plan__table table-plan__table--${getTableState(table)}`}
              style={{
                height: table.height + 'px',
                width: table.width + 'px',
                position: 'absolute',
                transform: `translate(${table.xPosition}px, ${table.yPosition}px)`
              }}
              key={table.number}>{table.number}</div>
          )
        })}
      </div>
    </div>
  )
}


const mapDispatchToProps = dispatch => ({
  showPopUpWithTimeout: (popUpType, popUpText) => dispatch(showPopUpWithTimeout(popUpType, popUpText)),
  loadModal: (modelType, modalResponseCallback) => dispatch(loadModal(modelType, modalResponseCallback))
})

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TablePlan)
