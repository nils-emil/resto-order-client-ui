import React from 'react';
import './styles.scss'
import Drawer from './components/Drawer';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import response from './response'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function MenuList(props) {
  return (
    <div className="menu-list">
      <Drawer/>
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

      <Fab color="primary" aria-label="add" className="add-icon">
        <AddIcon/>
      </Fab>

    </div>
  )
}
