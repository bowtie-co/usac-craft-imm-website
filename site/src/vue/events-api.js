import axios from 'axios';

export const EVENTS = axios.create({
    baseURL: '/API/',
    timeout: 100000,
    withCredentials: false,
});