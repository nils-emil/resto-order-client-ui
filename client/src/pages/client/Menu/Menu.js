import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getMenuItems } from '../../../services/adminService';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import { PopupConsumer } from "../../../services/popup-context";
import { ShoppingCartConsumer } from "../../../services/shoppingCartContext";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  cover: {
    marginRight: 10,
    height: 100
  },
  button: {
    float: 'right',
    marginTop: 10,
    fontSize: 10
  },
  description: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let categoryId = params.get('categoryId');
    getMenuItems({ category: categoryId }).subscribe(e => {
      setMenuItems(e.data);
    });
  }, [window.location.search]);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {menuItems.map(item => (
          <ExpansionPanel key={item._id}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon/>}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <img
                className={classes.cover}
                src={item.image}
                alt="Live from space album cover"
              />
              <Typography className={classes.heading}>{item.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className={classes.description}>
                {item.description}
                <br></br>
                <ShoppingCartConsumer>
                  {({ addItem }) => (
                    <PopupConsumer>
                      {({ addMessage }) =>
                        (
                          <Button
                            onClick={() => {
                              addMessage({ text: 'Added to cart', id: Math.random() })
                              addItem(item)
                            }}
                            variant="contained"
                            color="primary"
                            className={classes.button}>
                            Add item to carts
                          </Button>
                        )
                      }
                    </PopupConsumer>)
                  }
                </ShoppingCartConsumer>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      )
      }
    </div>
  );
}

export default Menu;



