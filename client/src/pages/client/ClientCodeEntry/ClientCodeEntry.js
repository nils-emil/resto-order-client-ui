import React, { useState } from 'react'
import './styles.scss'
import TextField from '@material-ui/core/TextField'
import NavigationIcon from '@material-ui/icons/Navigation'
import Fab from '@material-ui/core/Fab'
import { getTableCodeInfo } from '../../../services/clientService'
import { Redirect } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

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
              localStorage.setItem('organizationId', e.data.organizationId)
                setNavigate(true)
            }
        })
    };
    return (
        <div className="code-entry">
          {navigate ? <Redirect to='/menu'/> : null}
          <h3 className='intro-header-block'>
            <span className='intro-header-text'>Welcome to</span> <br></br>
            <span className='intro-header-text'>QuickOrder Resto!</span>
          </h3>
            <TextField
                label="Table code"
                margin="normal"
                onChange={event => setCode(event.target.value)}
                variant="outlined"/>
          <p className='intro-text'>Enter code and order food/service instantly!</p>

          <Fab className='btn-submit' onClick={() => submitCode()} variant="extended" aria-label="delete">
                <NavigationIcon/>
                Enter code
            </Fab>

        </div>
    );
}

export default ClientCodeEntry;
