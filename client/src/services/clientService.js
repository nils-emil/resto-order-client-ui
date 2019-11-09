import Axios from  'axios-observable';

export function getMenuItems() {
  return Axios.get('/api/menu')
}

export function getTableCodeInfo(tableCode) {
  return Axios.get(`/api/table/table/${tableCode}`)
}


export function getOpenTabs(tableCode) {
  return Axios.get(`/api/table/get-all-tabs/${tableCode}`)
}