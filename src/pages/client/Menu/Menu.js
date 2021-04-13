import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { getMenuItems } from '../../../services/adminService'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import * as actionCreators from '../../../store/actions'
import { connect } from 'react-redux'
import 'react-toastify/dist/ReactToastify.min.css';
import callToast from '../../../services/callToast'
import './styles.scss'

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
  categoryHeading: {
    textAlign: 'center'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    padding: '.5rem',
    width: 'calc(100% - 7rem)',
  },
}));

function Menu (props) {
  const [menuItems, setMenuItems] = useState([]);
  const [heading, setHeading] = useState([]);

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let categoryId = params.get('categoryId');
    getMenuItems({ categoryId: categoryId }).subscribe(e => {
      setMenuItems(e.data);
      setHeading( params.get('categoryTitle'))
    });
  }, [window.location.search]);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h3 className={classes.categoryHeading}>{ heading || 'Kogu menüü' }</h3>
      {menuItems.map(item => (
          <ExpansionPanel key={item._id}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon/>}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <div className={'cover'}
                   style={{'backgroundImage':  'url(' + item.imageUrl + ')'}}/>
              <Typography className={classes.heading}>{item.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className={classes.description}>
                {item.description}
                <br></br>
                <Button
                            onClick={() => {
                              props.addItemToCart(item)
                              callToast('Toode lisatud ostukorvi', 2500)
                            }}
                            variant="contained"
                            color="primary"
                            className={classes.button}>
                            Lisa toode ostukorvi
                          </Button>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      )
      }
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: (value) => dispatch(actionCreators.addItemToCart(value)),
    removeItemFromCart: (value) => dispatch(actionCreators.removeItemFromCart(value)),
  }
}
export default connect(null, mapDispatchToProps)(Menu)



