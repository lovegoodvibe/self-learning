import axios from 'axios';
import config from './config';
const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});



instance.interceptors.response.use(
    (response) => {
        return response.data;
    })

export default instance;
