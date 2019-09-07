import React, { useState } from 'react';

import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from '@material-ui/icons/Navigation';

const ClientCodeEntry = props => {
    const [code, setCode] = useState({code: ""});
    return (
        <React.Fragment>
            <TextField
                label="Code: XXXX"
                margin="normal"
                onChange={event => setCode(event.target.value)}
                variant="outlined"/>
            <Fab onClick={() => props.submit(code)} variant="extended" aria-label="delete">
                <NavigationIcon/>
                Enter code
            </Fab>
            <p>
                Enter code and order food/service instantly!
            </p>
        </React.Fragment>
    );
};

export default ClientCodeEntry;
