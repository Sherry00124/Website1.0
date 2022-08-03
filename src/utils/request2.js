import axios from 'axios'

const request = axios.create({//主机和目标管理
    baseURL: 'http://47.242.238.155:9996',
    timeout: 1000 * 5,
})

request.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
export default request