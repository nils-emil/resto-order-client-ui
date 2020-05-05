import React, { useState } from 'react'
import './styles.scss'
import { connect } from 'react-redux'
import { LoginSvg } from '../../resources/svg_index'
import { Redirect } from 'react-router-dom'
import TextButton, { buttonModifiers } from '../../components/TextButton/TextButton'
import { auth } from '../../store/actions/auth'
import TextField, { modifiers, types } from '../../components/TextField/TextField'


function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let redirect = null
  if (!props.auth.loading && props.auth.token) {
    redirect = <Redirect to='/admin'/>
  }

  return (
    <div className="login">
      {redirect}
      <div className="login__svg-container">
        <LoginSvg className="login__svg"/>
      </div>
      <div className="login__form">
        <h1>Logi sisse</h1>
        <TextField
          label="Emaili aadress"
          onChange={setEmail}
          modifiers={[modifiers.MARGINTOP]}
          autoFocus/>
        <TextField
          label="Parool"
          onChange={setPassword}
          modifiers={[modifiers.MARGINTOP]}
          type={types.PASSWORD}
        />
        <TextButton
          onClick={() => props.login({ email, password })}
          modifiers={[buttonModifiers.MARGINTOP]}
        >
          Logi sisse
        </TextButton>
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
    login: (value) => dispatch(auth(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
