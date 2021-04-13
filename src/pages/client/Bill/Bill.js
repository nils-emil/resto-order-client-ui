import React from 'react'
import './styles.scss'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Grid from '@material-ui/core/Grid'
import * as actionCreators from '../../../store/actions/shoppingCart'
import { connect } from 'react-redux'
import _ from 'lodash'
import callToast from '../../../services/callToast'
import { postOrder } from '../../../services/clientService'

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 0.5 + 'rem',
    width: '100%',
  },
  inline: {
    display: 'inline',
  },
  inlineBlock: {
    display: 'inline-block'
  },
  block: {
    display: 'block'
  },
  button: {
    float: 'right',
    fontSize: 0.5 + 'rem'
  },
  header: {
    margin: 0
  },
  textAlignCenter: {
    textAlign: 'center'
  }
}));

function Bill(props) {
  const deliverOrder = () => {
    postOrder(localStorage.getItem('tableCode'), props.items)
      .subscribe(e => {
        props.clearCart()
      }
    )
  }
  const classes = useStyles();
  let checkOutAction = <Button
    onClick={() => {
      deliverOrder();
      callToast('Tellimus jõuad Teieni peatselt', 5000)
    }}
    variant="contained"
    color="primary"
    className={classes.button}>
    Telli tooted lauda
  </Button>
  if (_.isEmpty(props.items)) {
    checkOutAction = <p className={classes.textAlignCenter}>Ostukorvis puuduvad tooted. Palun sirvige menüüd, et leida just Teile sobivad tooted.</p>
  }
  return (
    <span className="food-picker">
        <h4 className={classes.header}>Tellimus</h4>
          <List className={classes.root}>
                     {Object.entries(props.items).map(([key, element]) =>
                       <React.Fragment>
                         <ListItem key={element.item._id} alignItems="flex-start">
                           <ListItemAvatar>
                             <Avatar alt="Cindy Baker" src={element.item.imageUrl}/>
                           </ListItemAvatar>
                           <ListItemText
                             primary={element.item.title}
                             secondary={
                               <React.Fragment>
                                 <Typography
                                   component="span"
                                   variant="body2"
                                   className={classes.inline}
                                   color="textPrimary">
                                   <span className={classes.inlineBlock}>
                                     <span className={classes.block}> Kogus: {element.amount} </span>
                                     <span className={classes.block}> Hind: { (element.amount * element.item.price).toFixed(2)}</span>
                                   </span>
                                   <Grid item className={classes.button}>
                                     <ButtonGroup size="small" aria-label="small outlined secondary button group">
                                       <Button onClick={() => props.removeItemFromCart(element.item)}>-</Button>
                                       <Button onClick={() => props.addItemToCart(element.item)}>+</Button>
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
         </List>
      {checkOutAction}
    </span>);
}

const mapStateToProps = state => {
  return {
    totalSum: state.cart.totalSum,
    items: state.cart.items,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: (value) => dispatch(actionCreators.addItemToCart(value)),
    removeItemFromCart: (value) => dispatch(actionCreators.removeItemFromCart(value)),
    clearCart: () => dispatch(actionCreators.clearCart()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Bill);
