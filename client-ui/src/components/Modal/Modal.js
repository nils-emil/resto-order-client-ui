import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
}));

function SimpleModal(props) {
  const [modalStyle] = useState(getModalStyle);

  const handleClose = () => {
    props.setOpen(false);
  };
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          {props.children}
        </div>
      </Modal>
    </div>
  );
}

export default SimpleModal;
