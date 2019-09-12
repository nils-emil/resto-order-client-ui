const axios = require('axios');

export function getMenuItems() {
  return axios.get(process.env.REACT_APP_BACKEND_URL + '/api/menu').then(res => {
    return res.data;
  });
}

export function addMenuItem(params) {
  axios.post(process.env.REACT_APP_BACKEND_URL + '/api/menu/add', params).then(res => {
    return res.data;
  });
}
