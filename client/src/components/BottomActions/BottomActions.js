import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CallIcon from '@material-ui/icons/Call';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import './styles.scss';
import { withRouter } from 'react-router-dom';
import { PopupConsumer } from "../../services/popup-context";
import { ShoppingCartConsumer } from "../../services/shoppingCartContext";

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
    <PopupConsumer>
      {({ addMessage }) => (

        <ShoppingCartConsumer>
          {( {totalSum}) => (
            <BottomNavigation
              showLabels
              className="bar"
            >
              <BottomNavigationAction label="Call waiter" socket={props.socket} onClick={() => {
                callWaiter(addMessage)
              }} icon={<CallIcon/>}/>
              < BottomNavigationAction label="Menu" onClick={props.openDrawer} icon={<RestaurantMenuIcon/>}/>
              <BottomNavigationAction label={`Bill ${totalSum.toFixed(2)} €`}  onClick={onBillClick} icon={<CreditCardIcon/>}/>
            </BottomNavigation>
          )}
        </ShoppingCartConsumer>

      )}
    </PopupConsumer>
  );
}

export default withRouter(BottomActions);
