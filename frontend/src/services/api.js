import axios from 'axios';

const baseURL = 'https://giliforo.fly.dev/api';

const api = axios.create({
    baseURL,
});

export default api;
