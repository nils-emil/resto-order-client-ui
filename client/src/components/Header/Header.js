import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import './styles.scss'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

function Header(props) {

  return (
    <AppBar className="header">
      <Toolbar>
        <div className="nav-buttons">
          <Link to="/admin">
            <p>Panel</p>
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
