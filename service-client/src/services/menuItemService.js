import Axios from 'axios-observable'

export function getMenuItems(organizationId, params = null) {
  return Axios.get(`/api/menu/${organizationId}`, { params: params })
}

export function addMenuItem(params) {
  return Axios.post(`/api/menu/add`, params)
}

export function updateMenuItem(params) {
  return Axios.post(`/api/menu/update/${params._id}`, params)
}

export function removeMenuItem(id) {
  return Axios.delete(`/api/menu/delete/${id}`)
}
