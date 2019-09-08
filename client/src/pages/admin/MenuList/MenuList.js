import React, {Component} from 'react';
import './styles.scss'
import Drawer from './components/Drawer';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import response from './response'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {getMenuItems} from '../../../services/adminService';
import {Link} from 'react-router-dom';

export default class MenuList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
      menuItems: []
    };
  }


  componentDidMount() {
    const items = getMenuItems();
    this.setState({...this.state, isFetching: false});
    this.setState({...this.state, isFetching: items});
  }

  render() {
    return (
      <div className="menu-list">
        <Drawer/>

        <p>{this.state.isFetching ? 'Fetching users...' : ''}</p>

        <div className="content">
          <GridList cellHeight={260} className="grid-list">
            {response.map(tile => (
              <GridListTile key={tile.img} className="grid-tile">
                <img src={tile.img} alt={tile.title}/>
                <GridListTileBar
                  title={tile.title}
                  subtitle={<span>Price: {tile.price}€</span>}
                />
              </GridListTile>
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
