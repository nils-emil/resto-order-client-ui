import Axios from 'axios-observable'

export function fetchAll(organizationId) {
  return Axios.get(`/api/menu/order/all`)
}
