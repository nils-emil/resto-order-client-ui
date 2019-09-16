import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import './styles.scss'
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

function Header(props) {

  const menuButton = () => {
    return props.isClientView && (
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={props.openDrawer}>
        <MenuIcon/>
      </IconButton>
    )
  };

  return (
    <AppBar className="header">
      <Toolbar>
        {menuButton()}
        <Typography variant="h6">
          Vapiano
        </Typography>


        <div className="nav-buttons">
          <Link to="/admin">
            <p>Admin</p>
          </Link>

          <Link to="/">
            <p>Client</p>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
