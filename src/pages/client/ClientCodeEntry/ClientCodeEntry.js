import React, {useEffect, useState} from 'react'
import './styles.scss'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab'
import {getTableCodeInfo} from '../../../services/clientService'
import {Redirect, useHistory, useLocation} from 'react-router-dom'
import callErrorToast from '../../../services/callErrorToast'
import * as actionCreators from '../../../store/actions/shoppingCart'
import {connect} from 'react-redux'

function ClientCodeEntry (props) {
  const [code, setCode] = useState('')
  const [navigate, setNavigate] = useState(false)
  const [shouldSubmitCodeAutomatically, setShouldSubmitCodeAutomatically] = useState(false)
  const [shouldNotSubmitAutomaticallyAgain, setShouldNotSubmitAutomaticallyAgain] = useState(false)
  const location = useLocation();
  const submitCode = () => {
    getTableCodeInfo(code).subscribe(e => {
      if (!e.data) {
        // TODO error handling
        callErrorToast("Antud lauda ei suudetud leida, palun kontrollige sisestatud koodi", 5000)
        props.clearCart();
        setNavigate(true)
      } else {
        window["env"]["tableCode"] = e.data.code
        props.clearCart();
        setNavigate(true)
      }
    })
  }

  if(shouldSubmitCodeAutomatically && !shouldNotSubmitAutomaticallyAgain) {
    console.log("Should submit")
    setShouldNotSubmitAutomaticallyAgain(true)
    submitCode()
  }

  const queryParams = new URLSearchParams(location.search)
  if (queryParams.toString() && !shouldSubmitCodeAutomatically) {
    let tableCode = queryParams.toString().replace("tableCode=", "")
    setShouldSubmitCodeAutomatically(true)
    setCode(tableCode)
    console.log("Set code")
  }

  return (
    <div className={"code-entry " +  ((!code || code.length !== 6) && (code && code.length !== 0) ? "error" : "" )}>
      {navigate ? <Redirect to='/menu'/> : null}
      {navigate ? <Redirect to='/menu'/> : null}
      <img className={'enter-text-logo'} src="family_meal__monochromatic.svg" alt="React Logo"/>
      <TextField
        label="Kood"
        helperText={'Sisesta lauale esitatud kood'}
        inputProps={{ inputMode: 'numeric', maxLength: 6}}
        margin="normal"
        onChange={event => setCode(event.target.value)}
        variant="outlined"/>
      <Fab className='btn-submit'
           onClick={() => submitCode()} variant="extended"
           disabled={!code || code.length !== 6}>
        Sirvi menüüd
      </Fab>
    </div>
  )
}
const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(actionCreators.clearCart()),
  }
};

export default connect(null, mapDispatchToProps)(ClientCodeEntry);
