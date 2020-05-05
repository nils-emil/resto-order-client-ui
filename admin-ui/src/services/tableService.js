import Axios from 'axios-observable'

export function fetchAll(organizationId, params = null) {
  return Axios.get(`/api/admin/table/${organizationId}`, { params: params })
}

export function update(params) {
  return Axios.post(`/api/admin/table/`, params)
}
