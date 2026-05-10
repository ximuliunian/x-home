/**
 * HTTP 请求封装模块
 * 基于 axios 封装统一的请求拦截和响应处理
 */
import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios'

// 设置默认请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

/**
 * 创建 axios 实例
 */
const service = axios.create({
    baseURL: '/api',   // 请求基础路径
    timeout: 10000     // 请求超时时间（毫秒）
})

/**
 * 请求拦截器
 * 在发送请求前对配置进行处理
 */
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => config,
    (error) => Promise.reject(error)
);

/**
 * 响应拦截器
 * 在接收到响应后进行处理
 */
service.interceptors.response.use(
    (resp) => resp.data,
    (error) => Promise.reject(error)
);

/**
 * 封装请求方法
 * @param config - 请求配置
 * @returns Promise<T> - 返回数据类型
 */
function request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return service(config) as Promise<T>;
}

export default request