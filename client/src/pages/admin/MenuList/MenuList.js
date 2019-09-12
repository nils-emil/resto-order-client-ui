import React, {Component} from 'react';
import './styles.scss'
import Drawer from './components/Drawer';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {getMenuItems} from '../../../services/adminService';
import {Link} from 'react-router-dom';

export default class MenuList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      menuItems: []
    };
  }


  async componentDidMount() {
    let items = await getMenuItems();
    this.setState({...this.state, menuItems: items});
  }

  render() {
    return (
      <div className="menu-list">
        <Drawer/>
        <div className="content">
          <GridList cellHeight={260} className="grid-list">
            {this.state.menuItems.map(tile => (
              <Link to={{pathname: "/admin/item-edit", state: tile}}>
                <GridListTile key={tile.title} className="grid-tile">
                  <img src={tile.image} alt={tile.title}/>
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
}
