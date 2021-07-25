import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-c0030.firebaseio.com/'
});

export default instance;