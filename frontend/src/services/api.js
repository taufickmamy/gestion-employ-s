import axios from 'axios';

const API = axios.create({      
    baseURL: 'http://localhost/gestion-employ-s/backend/'
});

export default API;