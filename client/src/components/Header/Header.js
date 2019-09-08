import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './styles.scss'
import {Link} from 'react-router-dom';

export default function ButtonAppBar() {
  return (
    <header>
      <AppBar position="fixed">
        <Toolbar>
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
    </header>
  );
}
