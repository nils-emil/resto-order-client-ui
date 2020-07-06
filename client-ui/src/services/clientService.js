import Axios from  'axios-observable';


export function getTableCodeInfo(tableCode) {
  return Axios.get(`/api/table/${tableCode}`)
}

export function getOpenTabs(tableCode) {
  return Axios.get(`/api/table/get-all-tabs/${tableCode}`)
}

export function postOrder(tableCode, order) {
  return Axios.post(`/api/menu/order/add/${tableCode}`, order)
}
