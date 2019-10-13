import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CallIcon from '@material-ui/icons/Call';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import './styles.scss';
import { withRouter } from 'react-router-dom';
import { PopupConsumer } from "../../services/popup-context";

function BottomActions(props) {

  const callWaiter = (addNotificationFn) => {
    props.socket.emit('CALL_SERVICE', {
      tableCode: props.tableCode
    });
    addNotificationFn({ text: 'Waiter called', id: Math.random() })
  };

  const onBillClick = () => {
    props.history.push('/bill')
  };

  return (
    <BottomNavigation
      showLabels
      className="bar"
    >
      <PopupConsumer>
        {({ addMessage }) => (
          <BottomNavigationAction label="Call waiter" socket={props.socket} onClick={() => {
            callWaiter(addMessage)
          }} icon={<CallIcon/>}/>)}
      </PopupConsumer>
      <BottomNavigationAction label="Menu" onClick={props.openDrawer} icon={<RestaurantMenuIcon/>}/>
      <BottomNavigationAction label="Bill" onClick={onBillClick} icon={<CreditCardIcon/>}/>


    </BottomNavigation>
  );
}

export default withRouter(BottomActions);
