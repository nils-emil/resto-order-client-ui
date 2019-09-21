import Axios from  'axios-observable';

export function getMenuItems() {
  return Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/menu')
}
