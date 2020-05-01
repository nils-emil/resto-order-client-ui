import React, { useState } from 'react'
import './styles.scss'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import TextButton from '../../components/TextButton/TextButton'
import { auth } from '../../store/actions/auth'


function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let redirect = null
  if (!props.auth.loading && props.auth.token) {
    redirect = <Redirect to='/admin'/>
  }

  return (
    <div>
      {redirect}
      <div className="Paper">
        <h1>Logi sisse</h1>
        <input
          type="text"
          onChange={e => setEmail(e.target.value)}
          id="email"
          label="Email Address"
          name="email"
          autoFocus/>
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
          name="password"
          label="Password"
          id="password"
        />
        <TextButton
          onClick={() => props.login({ email, password })}
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
