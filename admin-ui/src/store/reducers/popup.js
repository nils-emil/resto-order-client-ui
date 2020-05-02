import { ActionTypes } from '../actions/popup'

export const reducer = (state = [], action) => {
  const newState = [...state]

  switch (action.type) {
    case ActionTypes.SHOW_POPUP:
      newState.push({
        options: action.options
      })

      return newState


    case ActionTypes.HIDE_POPUP:
      if (newState.length) {
        newState.shift()
        return newState
      } else {
        return state
      }

    default:
      return state
  }

  return newState
}
