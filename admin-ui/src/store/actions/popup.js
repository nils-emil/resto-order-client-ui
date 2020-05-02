export const ActionTypes = {
  SHOW_POPUP: 'SHOW_POPUP',
  HIDE_POPUP: 'HIDE_POPUP'
}

export const showPopUp = (options) => {
  return {
    type: ActionTypes.SHOW_POPUP,
    options
  }
}

export const hidePopUp = () => {
  return {
    type: ActionTypes.HIDE_POPUP
  }
}

export function showPopUpWithTimeout(options) {
  return function (dispatch) {
    dispatch(showPopUp(options))

    setTimeout(() => {
      dispatch(hidePopUp())
    }, 3000)
  }
}
