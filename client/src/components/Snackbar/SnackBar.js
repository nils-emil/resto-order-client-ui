import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './styles.scss'


function SnackBar(props) {

  return (
    <Snackbar
      open={props.isOpen}
      autoHideDuration={6000}
      onClose={props.handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">Waiter called</span>}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={props.handleClose}
        >
          <CloseIcon/>
        </IconButton>,
      ]}
    />
  );
}

export default SnackBar;
