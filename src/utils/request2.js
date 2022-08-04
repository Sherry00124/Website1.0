import axios from 'axios'

const request = axios.create({//主机和目标管理
    baseURL: 'https://1e666873-df02-4da6-a9ba-92350cb1b27c.mock.pstmn.io',
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