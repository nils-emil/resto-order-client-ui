import React, { useEffect, useState } from 'react'
import './styles.scss'
import { fetchAll } from '../../services/tableService'
import { connect } from 'react-redux/es/alternate-renderers'
import { showPopUpWithTimeout } from '../../store/actions/popup'

function TablePlan(props) {
  const { organizationId } = props.auth.user

  const [tables, setTables] = useState([])

  useEffect(() => {
    fetchAll(organizationId).subscribe((response) => {
      const responseTables = response.data
      setTables(responseTables)
    })
  }, [organizationId])

  const tableStates = [
    {
      tableNumber: 1,
      state: 'waiting'
    },
    {
      tableNumber: 2,
      state: 'empty'
    },
    {
      tableNumber: 3,
      state: 'empty'
    }
  ]

  const getTableState = (tableNumber) => {
    for (let table of tableStates) {
      if (table.tableNumber === parseInt(tableNumber)) {
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
              className={`table-plan__table table-plan__table--${getTableState(table.number)}`}
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
