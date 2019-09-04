import React from 'react';
import './App.css';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';

function App() {
    const useStyles = makeStyles(theme => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        dense: {
            marginTop: theme.spacing(2),
        },
        menu: {
            width: 200,
        },
    }));
    const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header">
          <TextField
              id="outlined-name"
              label="Code: XXXX"
              className={classes.textField}
              margin="normal"
              variant="outlined"
          />
        <p>
          Enter code and order food/service instantly!
        </p>
      </header>
    </div>
  );
}

export default App;
