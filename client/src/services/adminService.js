import Axios from  'axios-observable';

export function getMenuItems() {
  return Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/menu')
}

export function addMenuItem(params) {
  return Axios.post(process.env.REACT_APP_BACKEND_URL + '/api/menu/add', params);
}

export function updateMenuItem(params) {
  return Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/menu/update/${params._id}`, params)
}

export function removeMenuItem(id) {
  return Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/menu/delete/${id}`)
}
