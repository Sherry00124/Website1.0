import axios from 'axios'
import storageService from '../service/storageService';
const service = axios.create({//登录注册的axios请求
    baseURL: 'http://localhost:8080',
    timeout: 1000 * 5,
    headers: { Authorization: `Bearer ${storageService.get(storageService.USER_TOKEN)}` },
});


// Add a request interceptor
service.interceptors.request.use(function (config) {
    // Do something before request is sent
    Object.assign(config.headers, { Authorization: `Bearer ${storageService.get(storageService.USER_TOKEN)}` })//修改header
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
export default service
    

