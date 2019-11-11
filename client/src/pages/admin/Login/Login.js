import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './styles.scss'
import * as actionCreators from '../../../store/actions/index'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


function Login (props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let redirect = null;
  if (!props.auth.loading && props.auth.token) {
    redirect = <Redirect to='/admin'/>
  }

  return (
    <Container component="main" maxWidth="xs">
      {redirect}
      <CssBaseline />
      <div className="Paper">
        <Avatar className="Avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className="Form" onSubmit={() => props.login({email, password})} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            onChange={e => setEmail(e.target.value)}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus/>
          <TextField
            onChange={e => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"/>
          <Button
            type="button"
            onClick={() => props.login({email, password})}
            fullWidth
            variant="contained"
            color="primary"
            className="Submit">
            Sign In
          </Button>
        </form>
      </div>

    </Container>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: (value) => dispatch(actionCreators.addItemToCart(value)),
    login: (value) => dispatch(actionCreators.auth(value)),
    removeItemFromCart: (value) => dispatch(actionCreators.removeItemFromCart(value)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
