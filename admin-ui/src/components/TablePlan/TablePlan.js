import React, { useEffect, useState } from 'react'
import './styles.scss'
import { fetchAll } from '../../services/tableService'
import { connect } from 'react-redux/es/alternate-renderers'
import { showPopUpWithTimeout } from '../../store/actions/popup'

function TablePlan(props) {
  const { organizationId } = props.auth.user
  const { serviceCalls = [], orders = [] } = props

  const [tables, setTables] = useState([])

  useEffect(() => {
    fetchAll(organizationId).subscribe((response) => {
      const responseTables = response.data
      setTables(responseTables)
    })
  }, [organizationId])

  const getTableStates = () => {
    let states = []
    const tablesNeedingOrdering = orders.map(order => {
      if (order.isWaiting) {
        return order.tableCode
      }
    })
    const tablesNeedingServicing = serviceCalls.map(call => {
      if (call.isWaiting) {
        return call.tableCode
      }
    })

    for (let table of tables) {
      if (tablesNeedingOrdering.includes(table.code)) {
        states.push(
          {
            tableNumber: table.code,
            state: 'is-waiting-for-service'
          }
        )
        continue
      }

      if (tablesNeedingServicing.includes(table.code)) {
        states.push(
          {
            tableNumber: table.code,
            state: 'is-waiting-for-order'
          }
        )
        continue
      }

      states.push(
        {
          tableNumber: table.code,
          state: 'empty'
        }
      )
    }
    return states
  }

  const getTableState = (tableNumber) => {
    const tableStates = getTableStates()
    for (let table of tableStates) {
      if (table.tableNumber === tableNumber) {
        return table.state
      }
    }
  }

  return (
    <div className="table-plan">
      <div className="table-plan__internal-container">
        {tables.map(table => {
          return (
            <div
              className={`table-plan__table table-plan__table--${getTableState(table.code)}`}
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
  showPopUpWithTimeout: (popUpType, popUpText) => dispatch(showPopUpWithTimeout(popUpType, popUpText))
})

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TablePlan)
