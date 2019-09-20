import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CallIcon from '@material-ui/icons/Call';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import './styles.scss';
import io from 'socket.io-client';

function BottomActions(props) {

  const socket = io(process.env.REACT_APP_BACKEND_URL);

  const callWaiter = () => {
    socket.emit('CALL_SERVICE', {
      tableCode: props.tableCode
    });
  };

  return (
    <BottomNavigation
      showLabels
      className="bar"
    >
      <BottomNavigationAction label="Call waiter" onClick={callWaiter} icon={<CallIcon/>}/>
      <BottomNavigationAction label="Menu" icon={<RestaurantMenuIcon/>}/>
      <BottomNavigationAction label="Pay" icon={<CreditCardIcon/>}/>
    </BottomNavigation>
  );
};

export default BottomActions;
