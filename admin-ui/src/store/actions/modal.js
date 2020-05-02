export const ActionTypes = {
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL'
}

export const loadModal = (modalType, options) => {
  return {
    type: ActionTypes.SHOW_MODAL,
    modalType,
    options
  }
}

export const hideModal = () => {
  return {
    type: ActionTypes.HIDE_MODAL
  }
}
