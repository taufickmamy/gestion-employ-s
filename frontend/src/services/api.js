import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost/projet_react/backend/'
});

export default API;