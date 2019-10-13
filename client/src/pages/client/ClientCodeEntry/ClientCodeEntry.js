import React, {useState} from 'react';
import './styles.scss'
import TextField from "@material-ui/core/TextField";
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import {getTableCodeInfo} from "../../../services/clientService";
import {Redirect} from "react-router-dom";

function ClientCodeEntry(props) {
    const [code, setCode] = useState("");
    const [navigate, setNavigate] = useState(false);

    const submitCode = () => {
        getTableCodeInfo(code).subscribe(e => {
            if (!e.data) {
                // TODO error handling
                console.log("Invalid tableCode was entered")
            } else {
                localStorage.setItem('tableCode', e.data.code);
                console.log(e.data);
                setNavigate(true)
            }
        })
    };
    return (
        <div className="code-entry">
            {navigate ? <Redirect to='/bill'/> : null}
            <h3>Welcome to Vapiano!</h3>
            <p>Enter code and order food/service instantly!</p>
            <TextField
                label="Table code"
                margin="normal"
                onChange={event => setCode(event.target.value)}
                variant="outlined"/>
            <Fab onClick={() => submitCode()} variant="extended" aria-label="delete">
                <NavigationIcon/>
                Enter code
            </Fab>
        </div>
    );
}

export default ClientCodeEntry;
