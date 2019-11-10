import * as actionTypes from './actionTypes'

export const updateUser = (value) => {
  return {
    type: actionTypes.UPDATE_USER,
    value: value
  }
}



