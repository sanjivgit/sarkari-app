import axios from 'axios'
import { Storage } from './storage';

const instance = axios.create({
    baseURL: "http://10.194.116.155:8000/api/v1/",
    timeout: 100000,
    headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
    async function (config) {
        const user: any = await Storage.get("user");

        if (user?.token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Token ${user.token}`;
        }
        return config;
    },
    function (error) {
        // Do something with the request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lies within the range of 2xx causes this function to trigger
        // Do something with response data
        console.log("response >>>>", response)
        return response;
    },
    function (error) {
        // Any status codes that fall outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default instance