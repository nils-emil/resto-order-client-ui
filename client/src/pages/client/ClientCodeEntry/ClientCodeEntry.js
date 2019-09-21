import React, {useState} from 'react';
import './styles.scss'
import TextField from "@material-ui/core/TextField";
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import {Link} from 'react-router-dom';

function ClientCodeEntry(props) {
  const [code, setCode] = useState("");

  return (
    <div className="code-entry">

      <h3>Welcome to Vapiano!</h3>
      <p>Enter code and order food/service instantly!</p>

      <TextField
        label="Table code"
        margin="normal"
        onChange={event => setCode(event.target.value)}
        variant="outlined"/>

      <Link to={{pathname: "/bill", state: code}}>
        <Fab variant="extended" aria-label="delete">
          <NavigationIcon/>
          Enter code
        </Fab>
      </Link>
    </div>
  );
}

export default ClientCodeEntry;
