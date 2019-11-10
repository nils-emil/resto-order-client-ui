import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  user: { loggedIn: false }
}

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.UPDATE_USER) {
    return updateObject(state, { ...action.value, loggedIn: true })
  }
  return state
}

export default reducer
