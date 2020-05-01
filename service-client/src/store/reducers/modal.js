import { ActionTypes } from '../actions/modal'

const initialModalState = {
  modalType: null,
  options: null
}

export const reducer = (state = initialModalState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case ActionTypes.SHOW_MODAL:
      newState.modalType = action.modalType
      newState.options = action.options
      break

    case ActionTypes.HIDE_MODAL:
      return initialModalState

    default:
      return state
  }

  return newState
}
