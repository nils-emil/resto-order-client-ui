import React from 'react'
import './styles.scss'

function TablePlan(props) {

  const tables = [
    {
      number: 1,
      width: '20%',
      height: '10%',
      marginTop: '2rem',
      marginLeft: '2rem'
    },
    {
      number: 2,
      width: '20%',
      height: '10%',
      marginTop: '10rem',
      marginLeft: '2rem'
    }
  ]

  const tableStates = [
    {
      tableNumber: 1,
      state: 'waiting'
    },
    {
      tableNumber: 2,
      state: 'empty'
    }
  ]

  const getTableState = (tableNumber) => {
    const table = tableStates.filter(state => state.tableNumber === tableNumber)[0]
    return table.state
  }

  return (
    <div className="table-plan">
      <div className="table-plan__internal-container">
        {tables.map(table => {
          return (
            <div
              className={`table-plan__table table-plan__table--${getTableState(table.number)}`}
              style={{
                height: table.height,
                width: table.width,
                position: 'absolute',
                marginTop: table.marginTop,
                marginLeft: table.marginLeft
              }}
              key={table.number}>{table.number}</div>
          )
        })}
      </div>
    </div>
  )
}

export default TablePlan
