import Axios from 'axios-observable'

export function uploadImage(params) {
  return Axios.post(`/api/admin/image/upload`, params)
}
