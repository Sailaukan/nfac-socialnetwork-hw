'use client'

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com',
});


//HERE IS THE INTERCEPTOR EXAMPLE
axiosInstance.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}`;

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            console.error('Error response:', error.response);
            if (error.response.status === 401) {
                console.error('Unauthorized access - possibly invalid token');
            }
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
