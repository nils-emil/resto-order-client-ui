import React from 'react'
import './styles.scss'
import interact from 'interactjs'

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


  tables.forEach(table => {
    const position = { x: 0, y: 0 }

    interact(`.draggable-${table.number}`).draggable({
      listeners: {
        start(event) {
          console.log(event.type, event.target)
        },
        move(event) {
          position.x += event.dx
          position.y += event.dy

          event.target.style.transform =
            `translate(${position.x}px, ${position.y}px)`
        }
      },
      cursorChecker: (action, interactable, element, interacting) => {
        switch (action.axis) {
          case 'x':
            return 'ew-resize'
          case 'y':
            return 'ns-resize'
          default:
            return interacting ? 'grabbing' : 'grab'
        }
      },
      modifiers: [
        interact.modifiers.restrict({
          restriction: 'parent',
          endOnly: true
        })
      ]
    })
  })


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
              className={`draggable-${table.number} table-plan__table table-plan__table--${getTableState(table.number)}`}
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
