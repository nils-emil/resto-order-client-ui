import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './styles.scss'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

function Header(props) {

  return (
    <AppBar className="header">
      <Toolbar>
        <Typography variant="h6">
          ChatRestaurant
        </Typography>
        <div className="nav-buttons">
          <Link to="/admin">
            <p>Admin</p>
          </Link>
          <Link to="/">
            <p>Client</p>
          </Link>
          <Link to="/login">
            <p onClick={props.logout}>Logout</p>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps)(Header);
