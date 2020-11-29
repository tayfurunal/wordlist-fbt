const axios = require('axios')
export default axios.default.create({ baseURL: 'https://wordlist-server-api.herokuapp.com/api' })