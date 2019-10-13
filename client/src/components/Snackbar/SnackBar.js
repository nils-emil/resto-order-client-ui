import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './styles.scss'


function SnackBar(props) {

  useEffect(() => {
  }, []);

  return (
    <Snackbar
      style={{bottom: 50 + (25 * props.offset)}}
      open={true}
      message={<span id="message-id">{props.text}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={ () => props.handleClose(props._id)}
        >
          <CloseIcon/>
        </IconButton>,
      ]}
    />
  );
}

export default SnackBar;
