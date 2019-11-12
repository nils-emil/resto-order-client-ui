import * as actionTypes from '../actions/actionTypes'

const initialState = {
  totalSum: 0,
  items: {},
}

const removeFromCart = (state, action) => {
  let itemsCopy = { ...state.items }
  let itemsCopyElement = itemsCopy[action._id]
  let sum = state.totalSum
  if (itemsCopyElement) {
    sum -= itemsCopyElement.item.price
    if (itemsCopyElement.amount > 1) {
      itemsCopyElement.amount -= 1
    } else {
      delete itemsCopy[action._id]
    }
  }
  return {
    ...state, items: itemsCopy, totalSum: sum
  }
}

const addToCart = (state, value) => {
  let itemsCopy = { ...state.items }
  if (itemsCopy[value._id]) {
    itemsCopy[value._id].amount += 1
  } else {
    itemsCopy[value._id] = { item: value, amount: 1 }
  }
  let sum = state.totalSum
  sum += value.price
  return {
    ...state, items: itemsCopy, totalSum: sum
  }
}

function clearCart () {
  return {
    items: {}, totalSum: 0
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM_TO_CART :
      return addToCart(state, action.value)
    case actionTypes.REMOVE_ITEM_FROM_CART :
      return removeFromCart(state, action.value)
    case actionTypes.CLEAR_CART :
      return clearCart()
    default:
      break
  }
  return state
}

export default reducer
