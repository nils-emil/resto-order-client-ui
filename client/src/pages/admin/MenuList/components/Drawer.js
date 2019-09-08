import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import './styles.scss'

export default function TemporaryDrawer() {

  const sideList = (
    <div
      className="padding-top"
    >
      <List>
        {['Main courses', 'Side dishes', 'Dessert'].map((text) => (
          <ListItem button key={text} className="drawer-text">
            <ListItemText primary={text}/>
          </ListItem>
        ))}
      </List>
      <Divider/>
      <List>
        <ListItem button>
            <ListItemIcon><AddIcon/></ListItemIcon>
          <ListItemText primary="Add new category"/>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Drawer variant="permanent" className="drawer">
        {sideList}
      </Drawer>
    </div>
  );
}
