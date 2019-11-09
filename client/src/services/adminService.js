import Axios from  'axios-observable';

export function getMenuItems(params = null) {
  return Axios.get(`/api/menu`, { params: params})
}

export function getCategories() {
  return Axios.get(`/api/category`)
}

export function deleteCategory(id) {
  return Axios.delete(`/api/category/delete/${id}`)
}

export function createNewCategory(params) {
  return Axios.post(`/api/category/add`, params)
}

export function addMenuItem(params) {
  return Axios.post(`/api/menu/add`, params);
}

export function updateMenuItem(params) {
  return Axios.post(`/api/menu/update/${params._id}`, params)
}

export function removeMenuItem(id) {
  return Axios.get(`/api/menu/delete/${id}`)
}
