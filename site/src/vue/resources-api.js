import axios from 'axios';

export const RESOURCES = axios.create({
    baseURL: '/craft-api/',
    timeout: 100000,
});