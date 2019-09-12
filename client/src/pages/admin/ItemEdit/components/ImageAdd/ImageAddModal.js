import React, {useState} from 'react';
import './styles.scss'
import SimpleModal from '../../../../../components/Modal/Modal';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

function ImageAddModal(props) {
  const [url, setUrl] = useState(props.url);

  const save = () => {
    props.changeUrl(url);
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
        <InputLabel htmlFor="image">Image url</InputLabel>
        <Input value={url} onChange={e => setUrl(e.target.value)} id="image"/>

        <div className="modal-buttons">
          <Button onClick={cancel} size={'large'}>
            Cancel
          </Button>

          <Button onClick={save} variant="contained" color="primary" size={'large'}>
            Save
          </Button>
        </div>
      </SimpleModal>
  );
}

export default ImageAddModal;
