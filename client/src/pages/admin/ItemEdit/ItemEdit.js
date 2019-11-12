import React, { useEffect, useState } from 'react'
import './styles.scss'
import { Container } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import Grid from '@material-ui/core/Grid'
import ImageAdd from './components/ImageAdd/ImageAdd'
import ItemInfo from './components/ItemInfo/ItemInfo'
import { addMenuItem, getCategories, removeMenuItem, updateMenuItem } from '../../../services/adminService'
import DeleteModal from './components/DeleteModal/DeleteModal'
import { connect } from 'react-redux/es/alternate-renderers'

function ItemEdit(props) {
  const [isModalOpen, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState(
    props.location.state || {
      image: '',
      title: '',
      category: '',
      price: 0,
      description: '',
    }
  );

    useEffect(() => {
      getCategories(props.auth.user.data.organizationId).subscribe(e => {
            setCategories(e.data);
        });
    }, []);

  const deleteItem = () => {
    removeMenuItem(item._id).subscribe(() => {
        props.history.push('/admin/menu-list');
    });
  };

  const save = () => {
    if (props.location.state) {
      updateMenuItem(item).subscribe(e => {
          props.history.push('/admin/menu-list');
      });
    } else {
      addMenuItem(item).subscribe(e => {
          props.history.push('/admin/menu-list');
      });
    }
  };

  const cancel = () => {
    props.history.push('/admin/menu-list');
  };

  const updateField = event => {
    const modifiedItem = {...item};
    modifiedItem[event.target.id] = event.target.value;
    setItem(modifiedItem);
  };

    const updateMultiSelectField = (target, value) => {
        const modifiedItem = {...item};
        modifiedItem[target] = value;
        setItem(modifiedItem);
    };


  return (
    <Container className="container relative">
      <Grid container spacing={3} className="half-height">
        <Grid item xs={6} className="full-height">
          <ImageAdd
            url={item.imageUrl}
            onChange={(event) => updateField(event)}
          />
        </Grid>
        <Grid item xs={6}>
          <ItemInfo
            categories={categories}
            item={item}
            onChange={event => updateField(event)}
            onMultiSelectChange={(target, value) => updateMultiSelectField(target, value)}
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

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps, null)(ItemEdit)
