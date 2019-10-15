import React from 'react';
import './styles.scss'
import { ShoppingCartConsumer } from "../../../services/shoppingCartContext";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 0.5 + 'rem',
    width: '100%',
  },
  inline: {
    display: 'inline',
  },
  button: {
    float: 'right',
    fontSize: 0.5 + 'rem'
  }
}));

function Bill() {
  const classes = useStyles();
  return (
    <span className="food-picker">
        <h4>Welcome to chatrestaurant</h4>
          <List className={classes.root}>
              <ShoppingCartConsumer>
{}
                     {({ items, removeItem, addItem }) => Object.entries(items).map(([key,element]) =>
                       <React.Fragment>
                         <ListItem  key={element.item._id} alignItems="flex-start">
                           <ListItemAvatar>
                             <Avatar alt="Cindy Baker" src={element.item.image}/>
                           </ListItemAvatar>
                           <ListItemText
                             primary={element.item.title}
                             secondary={
                               <React.Fragment>
                                 <Typography
                                   component="span"
                                   variant="body2"
                                   className={classes.inline}
                                   color="textPrimary"
                                 >Count: {element.amount}

                                   <Grid item className={classes.button}>
                                     <ButtonGroup size="small" aria-label="small outlined secondary button group">
                                       <Button onClick={() => removeItem(element.item)}>-</Button>
                                       <Button onClick={() => addItem(element.item)} >+</Button>
                                     </ButtonGroup>
                                   </Grid>
                                 </Typography>
                               </React.Fragment>
                             }
                           />
                         </ListItem>
                         <Divider component="li"/>
                       </React.Fragment>
                     )}
                </ShoppingCartConsumer>
         </List>
    </span>);
}

export default Bill;
