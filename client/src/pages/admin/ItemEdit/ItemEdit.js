import React, {useState} from 'react';
import './styles.scss'
import {Container} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ImageAdd from './components/ImageAdd/ImageAdd';
import ItemInfo from './components/ItemInfo/ItemInfo';
import {addMenuItem} from '../../../services/adminService';

function ItemEdit(props) {
  const [item, setItem] = useState(
    props.location.state || {
      image: '',
      title: '',
      category: '',
      price: 0,
      description: '',
    }
  );

  const save = () => {
    addMenuItem(item);
    props.history.push('/admin/menu-list');
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
    <Container className="container">
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
            onChange={(event) => updateField(event)}
            save={() => save()}
            cancel={() => cancel()}
          />
        </Grid>
      </Grid>
    </Container>
  )

}

export default ItemEdit;
