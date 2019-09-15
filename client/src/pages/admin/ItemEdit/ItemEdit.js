import React, {useState} from 'react';
import './styles.scss'
import {Container} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import ImageAdd from './components/ImageAdd/ImageAdd';
import ItemInfo from './components/ItemInfo/ItemInfo';
import {addMenuItem, removeMenuItem, updateMenuItem} from '../../../services/adminService';
import DeleteModal from './components/DeleteModal/DeleteModal';

function ItemEdit(props) {
  const [isModalOpen, setOpen] = useState(false);
  const [item, setItem] = useState(
    props.location.state || {
      image: '',
      title: '',
      category: '',
      price: 0,
      description: '',
    }
  );


  const deleteItem = () => {
    removeMenuItem(item._id);
    props.history.push('/admin/menu-list');
  };

  const save = async () => {
    if (props.location.state) {
      await updateMenuItem(item);

      props.history.push('/admin/menu-list');
    } else {
      await addMenuItem(item);

      props.history.push('/admin/menu-list');
    }
  };

  const cancel = () => {
    props.history.push('/admin/menu-list');
  };

  const updateField = event => {
    let modifiedItem = {...item};
    modifiedItem[event.target.id] = event.target.value;

    setItem(modifiedItem);
  };

  return (
    <Container className="container relative">
      <Grid container spacing={3} className="half-height">
        <Grid item xs={6} className="full-height">
          <ImageAdd
            url={item.image}
            onChange={(event) => updateField(event)}
          />
        </Grid>
        <Grid item xs={6}>
          <ItemInfo
            item={item}
            onChange={event => updateField(event)}
            save={() => save()}
            cancel={() => cancel()}
          />
        </Grid>
      </Grid>

      <DeleteIcon className="trash-icon clickable" onClick={() => setOpen(true)}/>
      <DeleteModal
        confirm={() => deleteItem()}
        isModalOpen={isModalOpen}
        setOpen={isOpen => setOpen(isOpen)}
      />
    </Container>
  )

}

export default ItemEdit;
