import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://nr-burger-builder.firebaseio.com/'
});

export default instance;
