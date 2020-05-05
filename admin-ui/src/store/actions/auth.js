import Axios from 'axios-observable'

export const ActionTypes = {
  AUTH_START: 'AUTH_START',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAIL: 'AUTH_FAIL',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  SET_AUTH_REDIRECT_PATH: 'SET_AUTH_REDIRECT_PATH'
}

export const authStart = () => {
  return {
    type: ActionTypes.AUTH_START
  }
}

export const authSuccess = (token, user) => {
  return {
    type: ActionTypes.AUTH_SUCCESS,
    token: token,
    user: user
  }
}

export const authFail = (error) => {
  return {
    type: ActionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  return {
    type: ActionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export const auth = (credentials) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email: credentials.email,
      password: credentials.password
    }
    Axios.post('/api/user/login', authData)
      .subscribe(response => {
          localStorage.setItem('token', response.data.token)
          dispatch(authSuccess(response.data.token, response.data.user))
        },
        err => {
          dispatch(authFail(err.response.data.error))
        })
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: ActionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      Axios.get('/api/user/current').subscribe(response => {
        dispatch(authSuccess(token, response.data))
      })
    }
  }
}
