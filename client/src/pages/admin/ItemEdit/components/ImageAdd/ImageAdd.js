import React, {useState} from 'react';
import './styles.scss'
import Card from '@material-ui/core/Card';
import ImageAddModal from './ImageAddModal';

function ImageAdd(props) {
  const [isModalOpen, setOpen] = useState();

  const save = (value) => {
    props.onChange({target: {value: value, id: 'image'}});
    setOpen(false);
  };

  return (
    <div className="image-height">
      <Card onClick={() => setOpen(true)} className="card">
        <img src={props.url || 'https://static.thenounproject.com/png/187803-200.png'} alt=""/>
      </Card>

      <ImageAddModal
        isModalOpen={isModalOpen}
        changeUrl={value => save(value)}
        url={props.url}
        setOpen={isOpen => setOpen(isOpen)}
      />
    </div>
  );
}

export default ImageAdd;
