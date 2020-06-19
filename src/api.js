import axios from 'axios';

const api = axios.create({
    baseURL: 'http://appbusca.herokuapp.com/'
})

export default api;