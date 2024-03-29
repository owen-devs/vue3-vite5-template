declare module 'axios' {
    export interface AxiosRequestConfig {
        /**
         * @description: 接口res直接获取response对象，一般用于下载文件流
         */
        download?: boolean
    }
}
