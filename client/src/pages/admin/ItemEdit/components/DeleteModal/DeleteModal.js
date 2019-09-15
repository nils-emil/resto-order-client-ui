import React from 'react';
import SimpleModal from '../../../../../components/Modal/Modal';
import Button from '@material-ui/core/Button';

function DeleteModal(props) {

  const confirm = () => {
    props.confirm();
    props.setOpen(false);
  };

  const cancel = () => {
    props.setOpen(false);
  };

  return (
    <SimpleModal
      open={props.isModalOpen}
      setOpen={(value) => props.setOpen(value)}
    >
      <p>Delete item?</p>

      <div className="modal-buttons">
        <Button onClick={cancel} size={'large'}>
          Cancel
        </Button>

        <Button onClick={confirm} variant="contained" color="primary" size={'large'}>
          Confirm
        </Button>
      </div>
    </SimpleModal>
  );
}

export default DeleteModal;
