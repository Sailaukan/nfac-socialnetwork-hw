import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com',
});


//HERE IS THE INTERCEPTOR EXAMPLE
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
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
