import axios from 'axios';

const api = axios.create({
    baseURL: 'https://appbusca.herokuapp.com/'
})

export default api;