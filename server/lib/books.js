const axios = require('axios')

function get () {
  return new Promise((resolve, reject) => {
    return axios({
      url: 'https://servicepros-test-api.herokuapp.com/api/v1/books',
      method: 'GET',
      mode: 'no-cors'
    })
    .then(response => {
      resolve(response.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

module.exports = {
  get
}
