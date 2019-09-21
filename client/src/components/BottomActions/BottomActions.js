import React, {useState} from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CallIcon from '@material-ui/icons/Call';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import './styles.scss';
import io from 'socket.io-client';
import SnackBar from '../Snackbar/SnackBar';
import {withRouter} from 'react-router-dom';

function BottomActions(props) {
  const [isSnackbarOpen, toggleSnackbar] = useState(false);
  const socket = io(process.env.REACT_APP_BACKEND_URL);

  const callWaiter = () => {
    socket.emit('CALL_SERVICE', {
      tableCode: props.tableCode
    });

    toggleSnackbar(true);
  };

  const onBillClick = () => {
    props.history.push('/bill')
  };

  return (
    <BottomNavigation
      showLabels
      className="bar"
    >
      <BottomNavigationAction label="Call waiter" onClick={callWaiter} icon={<CallIcon/>}/>
      <BottomNavigationAction label="Menu" onClick={props.openDrawer} icon={<RestaurantMenuIcon/>}/>
      <BottomNavigationAction label="Bill" onClick={onBillClick} icon={<CreditCardIcon/>}/>

      <SnackBar
        isOpen={isSnackbarOpen}
        handleClose={() => toggleSnackbar(false)}
      />
    </BottomNavigation>
  );
}

export default withRouter(BottomActions);
