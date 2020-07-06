import React, { useState } from 'react'
import './styles.scss'
import { connect } from 'react-redux'
import { LoginSvg } from '../../resources/svg_index'
import { Redirect } from 'react-router-dom'
import TextButton, { buttonModifiers } from '../../components/TextButton/TextButton'
import { auth } from '../../store/actions/auth'
import TextField, { modifiers, types } from '../../components/TextField/TextField'

const isMobile = window.matchMedia('only screen and (max-width: 760px)').matches

function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isErrorState, setErrorState] = useState(false)

  let redirect = null
  if (!props.auth.loading && props.auth.token) {
    redirect = <Redirect to='/admin'/>
  }

  return (
    <div className="login">
      {redirect}
      {!isMobile &&
      <div className="login__svg-container">
        <LoginSvg className="login__svg"/>
      </div>
      }
      <div className="login__form">
        <h1 className="login__header">Tere tulemast!</h1>
        <div className="login__field-container">
          {isErrorState && <p className="login__error-message">Vale email või parool</p>}
          <TextField
            label="Emaili aadress"
            onChange={setEmail}
            modifiers={[modifiers.MARGINTOP, isErrorState ? modifiers.ERROR : '']}
            autoFocus/>
        </div>
        <div className="login__field-container">
          <TextField
            label="Parool"
            onChange={setPassword}
            modifiers={[modifiers.MARGINTOP, isErrorState ? modifiers.ERROR : '']}
            type={types.PASSWORD}
          />
        </div>
        <div className="login__field-container">
          <TextButton
            onClick={() => props.login({ email, password }, () => setErrorState(true))}
            modifiers={[buttonModifiers.MARGINTOP]}
          >
            Logi sisse
          </TextButton>
        </div>
      </div>

    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (value, cb) => dispatch(auth(value, cb))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
