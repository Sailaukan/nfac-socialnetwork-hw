import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });