import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import Cookies from 'js-cookie'
import type { AxiosError, AxiosResponse } from 'node_modules/axios/index.cjs'

function createService(options: any) {
    const service = axios.create(options)

    service.interceptors.request.use(
        (config: AxiosRequestConfig) => {
            // config.headers['Authorization'] = 'Bearer ' + Cookies.get('access_token')
            return config
        },
        (error: AxiosError) => {
            return Promise.reject(error)
        }
    )

    service.interceptors.response.use(
        (response: AxiosResponse) => {
            if (response?.config?.download) {
                return response
            }
            const res = response.data
            if (!res.success) {
                ElMessage.error(res.msg || '请求错误！')
                return Promise.reject(new Error(res.msg || '请求错误！'))
            }
            return res.result
        },
        (error: AxiosError) => {
            console.log(error?.response?.data?.code)
            if (error?.response?.data?.code === 401) {
                const currentUrl = encodeURIComponent(window.location.href)
                window.location.href =
                    'http://localhost:9998/auth-api/login?redirectUrl=' + currentUrl
                return Promise.reject(error)
            }
            ElMessage.error(error?.response?.data?.msg || error?.response?.status)
            return Promise.reject(error)
        }
    )
    return service
}
console.log(import.meta.env)
const request = createService({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 35000
})

const download = createService({
    baseURL: import.meta.env.VITE_BASE_API,
    responseType: 'arraybuffer',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    download: true,
    timeout: 0
})

export { request, download }
