import React, {useEffect, useState} from 'react';
import './styles.scss'
import Drawer from './components/Drawer';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {getMenuItems, getCategories, deleteCategory, createNewCategory} from '../../../services/adminService';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux/es/alternate-renderers'

function MenuList(props) {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");

    useEffect(() => {
        getMenuItems(props.auth.user.data.organizationId).subscribe(e => {
            setMenuItems(e.data);
        });
        getCategories(props.auth.user.data.organizationId).subscribe(e => {
            setCategories(e.data);
        });
    }, []);

    const deleteCategoryHandler = (id, index) => {
        return deleteCategory(id, index).subscribe(e => {
            let updatedCategories = [...categories];
            updatedCategories.splice(index, 1);
            setCategories(updatedCategories)
            getMenuItems(props.auth.user.data.organizationId).subscribe(e => {
                setMenuItems(e.data);
            });
        })
    };

    const createNewCategoryHandler = (name) => {
        const category = {name: name, order: categories.length};
        return createNewCategory(category).subscribe(e => {
            setCategories([...categories, e.data])
        })
    };

    const selectCategoryHandler = (categoryId) => {
        setSelectedCategoryId(categoryId)
    };

  return (
    <div className="menu-list">
      <Drawer categories={categories}
              deleteCategory={deleteCategoryHandler}
              selectCategory={selectCategoryHandler}
              createNewCategory={createNewCategoryHandler}
      />
      <div className="content">
        <GridList cellHeight={260} className="grid-list">
          {menuItems.filter(e => (!selectedCategoryId && !e.categoryId) || (e.categoryId === selectedCategoryId)).map(tile => (
            <Link key={tile._id} className="grid-tile" to={{pathname: "/admin/item-edit", state: tile}}>
              <GridListTile key={tile.title} className="height-inherit">
                <img src={tile.imageUrl} alt={tile.title}/>
                <GridListTileBar
                  title={tile.title}
                  subtitle={<span>Price: {tile.price}€</span>}
                />
              </GridListTile>
            </Link>
          ))}
        </GridList>
      </div>

      <Link to="/admin/item-edit">
        <Fab color="primary" aria-label="add" className="add-icon">
          <AddIcon/>
        </Fab>
      </Link>
    </div>
  )
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, null)(MenuList)
