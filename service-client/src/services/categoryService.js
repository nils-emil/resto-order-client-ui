import Axios from 'axios-observable'

export function getCategories(organizationId) {
  return Axios.get(`/api/category/${organizationId}`)
}

export function createCategory(params) {
  return Axios.post(`/api/category/add`, params)
}

export function updateCategory(params) {
  return Axios.post(`/api/category/update/${params._id}`, params)
}

export function deleteCategory(id) {
  return Axios.delete(`/api/category/delete/${id}`)
}

