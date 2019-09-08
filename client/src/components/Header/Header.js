import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './styles.scss'
import AddIcon from '@material-ui/core/SvgIcon/SvgIcon';

export default function ButtonAppBar() {
  return (
    <div className="header">
      <AppBar position="fixed">
        <Toolbar>
          <AddIcon/>
          <Typography variant="h6" className="title">
            Vapiano
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
