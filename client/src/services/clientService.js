import Axios from  'axios-observable';

export function getMenuItems() {
  return Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/menu')
}

export function getTableCodeInfo(tableCode) {
  return Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/table/table/${tableCode}`)
}


export function getOpenTabs(tableCode) {
  return Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/table/get-all-tabs/${tableCode}`)
}