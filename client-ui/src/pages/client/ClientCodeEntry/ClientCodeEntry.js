import React, { useState } from 'react'
import './styles.scss'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab'
import { getTableCodeInfo } from '../../../services/clientService'
import { Redirect } from 'react-router-dom'

function ClientCodeEntry (props) {
  const [code, setCode] = useState('')
  const [navigate, setNavigate] = useState(false)

  const submitCode = () => {
    getTableCodeInfo(code).subscribe(e => {
      if (!e.data) {
        // TODO error handling
        console.log('Invalid tableCode was entered')
      } else {
        localStorage.setItem('tableCode', e.data.code)
        localStorage.setItem('organizationId', e.data.organizationId)
        setNavigate(true)
      }
    })
  }
  let opacity = 1;
  if (code.length < 6) {
    opacity = 0;
  }
  return (
    <div className="code-entry">
      {navigate ? <Redirect to='/menu'/> : null}
      <img className={'enter-text-logo'} src="family_meal__monochromatic.svg" alt="React Logo"/>
      <TextField
        label="Kood"
        helperText={'Sisesta lauale esitatud kood'}
        inputProps={{ inputMode: 'numeric' }}
        margin="normal"
        onChange={event => setCode(event.target.value)}
        variant="outlined"/>
      <Fab style={{opacity: opacity}} className='btn-submit' onClick={() => submitCode()} variant="extended">
        Sirvi menüüd
      </Fab>
    </div>
  )
}

export default ClientCodeEntry
