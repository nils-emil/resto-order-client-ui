import Axios from 'axios-observable'

export function fetchAll() {
  return Axios.get(`/api/menu/order/all`)
}

export function fetchByTableCode(organizationId) {
  return Axios.get(`/api/menu/order/${organizationId}`)
}
