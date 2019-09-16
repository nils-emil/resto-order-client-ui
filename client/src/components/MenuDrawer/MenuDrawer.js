import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function MenuDrawer(props) {
  const sideList = () => (
    <div
      role="presentation"
    >
      <List>
        {['Main course', 'Soups', 'Hamburgers', 'Pizzas'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text}/>
          </ListItem>
        ))}
      </List>
      <Divider/>
      <List>
        {['Soft drinks', 'Hot drinks', 'Alcholic beverages'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text}/>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        open={props.isOpen}
        onOpen={props.openDrawer}
        onClose={props.closeDrawer}
      >
        {sideList()}
      </SwipeableDrawer>
    </div>
  );
}

export default MenuDrawer;
