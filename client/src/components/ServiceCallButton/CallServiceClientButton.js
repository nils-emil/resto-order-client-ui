import React from "react";
import io from "socket.io-client";
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {purple} from "@material-ui/core/colors";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";


export default function CallServiceClientButton(props) {
    const classes = makeStyles();
    const blueTheme = createMuiTheme({palette: {primary: purple}});

    // TODO take from env file
    const socket = io(process.env.REACT_APP_BACKEND_URL);

    const sendMessage = ev => {
        ev.preventDefault();
        socket.emit('CALL_SERVICE', {
            tableCode: props.tableCode
        });
    };

    return (
        <div>
            <MuiThemeProvider theme={blueTheme}>
                <Button
                    onClick={sendMessage}
                    theme={blueTheme}
                    variant="contained"
                    size="medium"
                    color="primary"
                    className={classes.margin}
                >Call service
                </Button>
            </MuiThemeProvider>
        </div>

    );
}
