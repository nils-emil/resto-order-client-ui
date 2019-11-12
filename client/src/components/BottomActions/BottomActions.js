import React, { useState } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import CallIcon from '@material-ui/icons/Call'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'
import './styles.scss'
import { withRouter } from 'react-router-dom'
import * as actionCreators from '../../store/actions/index'
import { connect } from 'react-redux'
import callToast from '../../services/callToast'
import { ToastContainer } from 'react-toastify'

function BottomActions (props) {
  const [serviceCallAvailable, setServiceCallAvailable] = useState(true)

  const callWaiter = (addNotificationFn) => {
    if (serviceCallAvailable) {
      setServiceCallAvailable(false)
      props.socket.emit('CALL_SERVICE', {
        tableCode: props.tableCode
      })
      setTimeout(() => {
        setServiceCallAvailable(true)
      }, 5000)
      addNotificationFn({ text: 'Waiter called', id: Math.random() })
    }
  }

  const onBillClick = () => {
    props.history.push('/bill')
  }

  return (
    <BottomNavigation showLabels className="bar">
      <BottomNavigationAction className={serviceCallAvailable ? '' : 'disabled'} label="Call waiter"
                              onClick={() => {
        callWaiter(() => callToast('Waiter called', 5000))
      }} icon={<CallIcon/>}/>
      <BottomNavigationAction label="Menu" onClick={props.openDrawer} icon={<RestaurantMenuIcon/>}/>
      <BottomNavigationAction label={`Bill ${props.totalSum.toFixed(2)} €`}
                              onClick={onBillClick}
                              icon={<CreditCardIcon/>}/>
      <ToastContainer/>
    </BottomNavigation>
  )
}

const mapStateToProps = state => {
  return {
    totalSum: state.cart.totalSum,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: (value) => dispatch(actionCreators.addItemToCart(value)),
    removeItemFromCart: (value) => dispatch(actionCreators.removeItemFromCart(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BottomActions))
