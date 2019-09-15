const axios = require('axios');

export function getMenuItems() {
  return axios.get(process.env.REACT_APP_BACKEND_URL + '/api/menu').then(res => {
    return res.data;
  });
}

export async function addMenuItem(params) {
  await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/menu/add', params).then(res => {
    return res.data;
  });
}

export async function updateMenuItem(params) {
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/menu/update/${params._id}`, params).then(res => {
    return res.data;
  });
}


export function removeMenuItem(id) {
  axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/menu/delete/${id}`).then(res => {
    return res.data;
  });
}
