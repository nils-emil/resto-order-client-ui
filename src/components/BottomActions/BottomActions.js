import React, { useState } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import CallIcon from '@material-ui/icons/Call'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'
import './styles.scss'
import { withRouter } from 'react-router-dom'
import * as actionCreators from '../../store/actions'
import { connect } from 'react-redux'
import CallServiceChoice from "../CallServiceChoice/CallServiceChoice";
import { postServiceCall } from '../../services/clientService'

function BottomActions (props) {
  const [serviceCallAvailable, setServiceCallAvailable] = useState(true)
  const [callServiceDialogOpen, setCallServiceDialogOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (serviceCallAvailable) {
      setCallServiceDialogOpen(true);
    }
  };

  const handleClose = () => {
    setCallServiceDialogOpen(false);
  };

  const callWaiter = (addNotificationFn, type) => {
    if (serviceCallAvailable) {
      setServiceCallAvailable(false)
      postServiceCall(localStorage.getItem("tableCode"), type)
          .subscribe(e => {})
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
      <CallServiceChoice callWaiter={callWaiter}
                         handleClickOpen={handleClickOpen}
                         handleClose={handleClose} open={callServiceDialogOpen}/>
      <BottomNavigationAction className={serviceCallAvailable ? '' : 'disabled'} label="Kutsu teenindaja"
                              onClick={handleClickOpen} icon={<CallIcon/>}/>
      <BottomNavigationAction label="Menüü" onClick={props.openDrawer} icon={<RestaurantMenuIcon/>}/>
      <BottomNavigationAction label={`Arve ${props.totalSum.toFixed(2)} €`}
                              onClick={onBillClick}
                              icon={<CreditCardIcon/>}/>
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
