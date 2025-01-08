import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: '/api',
    // 超时
    timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(config => {
    return config
}, error => Promise.reject(error));

// 响应拦截器
service.interceptors.response.use(resp => {
    return resp.data
}, error => Promise.reject(error));
export default service
