import React, {useState} from 'react';

import './styles.scss'
import TextField from "@material-ui/core/TextField";
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import {Link} from 'react-router-dom';

const ClientCodeEntry = props => {
  const [setCode] = useState({code: ""});
  return (
    <div className="code-entry">
      <TextField
        label="Code: XXXX"
        margin="normal"
        onChange={event => setCode(event.target.value)}
        variant="outlined"/>
      <Link to="/food/">
        <Fab variant="extended" aria-label="delete">
          <NavigationIcon/>
          Enter code
        </Fab>
      </Link>
      <p>
        Enter code and order food/service instantly!
      </p>
    </div>
  );
};

export default ClientCodeEntry;
