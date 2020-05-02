import { ActionTypes } from '../actions/auth'
import { updateObject } from '../utility'

const initialState = {
  token: null,
  user: null,
  error: null,
  loading: true,
  authRedirectPath: '/'
}

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true })
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    user: action.user,
    error: null,
    loading: false
  })
}

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const authLogout = (state) => {
  return updateObject(state, { token: null, user: null, loading: false })
}

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path })
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_START:
      return authStart(state, action)
    case ActionTypes.AUTH_SUCCESS:
      return authSuccess(state, action)
    case ActionTypes.AUTH_FAIL:
      return authFail(state, action)
    case ActionTypes.AUTH_LOGOUT:
      return authLogout(state)
    case ActionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action)
    default:
      return state
  }
}
