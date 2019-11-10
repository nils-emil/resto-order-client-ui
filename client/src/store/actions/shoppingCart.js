import * as actionTypes from './actionTypes'

export const addItemToCart = (value) => {
  return {
    type: actionTypes.ADD_ITEM_TO_CART,
    value: value
  }
}

export const removeItemFromCart = (value) => {
  return {
    type: actionTypes.REMOVE_ITEM_FROM_CART,
    value: value
  }
}

